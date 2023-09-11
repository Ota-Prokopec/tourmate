import { owner } from '@app/appwrite-permissions'
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-server-graphql'
import { isBase64 } from '@app/utils'
import { arg, mutationField } from 'nexus'
import { numberTimingCoords } from '@app/experience-settings'

export default mutationField('createMonument', {
	type: 'Monument',
	args: { input: arg({ type: 'CreateMonumentInput' }) },
	resolve: async (s, args, ctx) => {
		if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')
		const { collections, buckets } = ctx.appwrite

		const file = isBase64(args.input.picture) ? await buckets.monumentsPictures.createFile(args.input.picture, owner(ctx.user.$id)) : null

		const document = await collections.monument.createDocument(
			{
				placeDetailId: '', //! create place detail
				latitude: Math.floor(args.input.location[0] * numberTimingCoords),
				longitude: Math.floor(args.input.location[1] * numberTimingCoords),
				about: args.input.about,
				name: args.input.name,
				creatorUserId: ctx.user.$id,
				pictureURL: file ? buckets.monumentsPictures.getFileURL(file?.$id) : undefined,
			},
			[ctx.user],
		)
		return transformMonumentsDocumentsIntoMonuments(document)[0]
	},
})
