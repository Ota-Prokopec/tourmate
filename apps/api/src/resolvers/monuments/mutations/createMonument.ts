import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-server-graphql'
import { isBase64 } from '@app/utils'
import { arg, mutationField } from 'nexus'
import { numberTimingCoords } from '@app/experience-settings'
import buckets from '@app/cloudinary-server'

import { v2 as cloudinary } from 'cloudinary'

export default mutationField('createMonument', {
	type: 'Monument',
	args: { input: arg({ type: 'CreateMonumentInput' }) },
	resolve: async (s, args, ctx) => {
		try {
			if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')
			const { collections } = ctx.appwrite

			const file = isBase64(args.input.picture) ? await buckets.monuments.uploadBase64(args.input.picture) : null

			const placeDetail = await collections.placeDetail.createDocument(
				{
					name: args.input.placeName,
				},
				[ctx.user],
			)

			const document = await collections.monument.createDocument(
				{
					placeDetailId: placeDetail._id,
					latitude: Math.floor(args.input.location[0] * numberTimingCoords),
					longitude: Math.floor(args.input.location[1] * numberTimingCoords),
					about: args.input.about,
					name: args.input.name,
					creatorUserId: ctx.user.$id,
					pictureURL: file?.url,
				},
				[ctx.user],
			)
			return transformMonumentsDocumentsIntoMonuments(document)[0]
		} catch (error) {
			console.log(error)
			throw new Error('')
		}
	},
})
