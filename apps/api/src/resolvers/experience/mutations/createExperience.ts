import { arg, mutationField } from 'nexus'
import createExperienceInput from '../schema/createExperienceInput'
import { isBase64 } from '@app/utils'
import { ApolloError } from 'apollo-server-express'
import { transformExperienceDocumentsIntoExperience } from '../../../lib/database/experiences-monuments'
import buckets from '@app/cloudinary-server'

export default mutationField('createExperience', {
	args: { input: arg({ type: createExperienceInput }) },
	type: 'Experience',
	resolve: async (s, args, ctx) => {
		const { collections } = ctx.appwrite

		if (!isBase64(args.input.picture)) throw new Error('input.imgSrc musts be a valid base64 string')
		if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')

		const placeDetail = await collections.placeDetail.createDocument(
			{
				name: args.input.placeName,
			},
			[ctx.user],
		)

		const document = await buckets.experiences.uploadBase64(args.input.picture).then(async ({ url }) => {
			if (!ctx.isAuthed(ctx.user?.$id)) throw new ApolloError('User is not Authed', '403')
			return await collections.experience.createDocument({
				userId: ctx.user.$id,
				imgSrc: url,
				latitude: Math.round(args.input.location[0]),
				longitude: Math.round(args.input.location[1]),
				placeDetailId: placeDetail._id,
			})
		})
		return transformExperienceDocumentsIntoExperience(document)[0]
	},
})
