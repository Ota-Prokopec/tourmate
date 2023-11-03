import { fromLatLongIntoLocation } from '../../../lib/database/experiences-monuments'
import { isBase64 } from '@app/utils'
import { arg, mutationField } from 'nexus'
import cloudinary from '@app/cloudinary-server'

export default mutationField('createMonument', {
	type: 'Monument',
	args: { input: arg({ type: 'CreateMonumentInput' }) },
	resolve: async (s, args, ctx) => {
		try {
			if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')
			const { collections } = ctx.appwrite

			// create image for monument
			const filePromise = isBase64(args.input.picture)
				? cloudinary.monuments.uploadBase64(args.input.picture)
				: null

			//create place-detail for monument
			const placeDetailPromise = collections.placeDetail.createDocument(
				{
					name: args.input.placeName,
				},
				[ctx.user],
			)

			const [file, placeDetail] = await Promise.all([filePromise, placeDetailPromise])

			//create monument
			const document = await collections.monument.createDocument(
				{
					transports: args.input.transports,
					placeDetailId: placeDetail._id,
					topics: args.input.topics,
					latitude: args.input.location[0],
					longitude: args.input.location[1],
					about: args.input.about,
					name: args.input.name,
					userId: ctx.user.$id,
					pictureURL: file?.url,
				},
				[ctx.user],
			)
			return fromLatLongIntoLocation(document)[0]
		} catch (error) {
			console.log(error)
			throw new Error('')
		}
	},
})
