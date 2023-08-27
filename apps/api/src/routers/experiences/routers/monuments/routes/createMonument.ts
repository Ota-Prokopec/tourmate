import { protectedProcedure } from '$middlewares/isAuthed'
import appwriteServer, { permissions } from '@app/appwrite-server'
import { monumentZod } from '@app/ts-types'
import { numberTimingCoords } from '@app/experience-database-server'
import { isBase64 } from '@app/utils'
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-client/src/transformers'

export const createMonument = protectedProcedure.input(monumentZod.omit({ creatorUserId: true })).mutation(async ({ ctx, input }) => {
	const { collections, buckets } = appwriteServer.set(ctx.appwriteClients.user)
	const file = isBase64(input.pictureURL)
		? await buckets.monumentsPictures.createFile(input.pictureURL, permissions.owner(ctx.user.$id))
		: undefined

	const res = await collections.monument.createDocument(
		{
			latitude: Math.floor(input.location[0] * numberTimingCoords),
			longitude: Math.floor(input.location[1] * numberTimingCoords),
			about: input.about,
			name: input.name,
			creatorUserId: ctx.user.$id,
			pictureURL: file ? buckets.monumentsPictures.getFileURL(file?.$id) : undefined,
		},
		[ctx.user],
	)
	return transformMonumentsDocumentsIntoMonuments(res)[0]
})
