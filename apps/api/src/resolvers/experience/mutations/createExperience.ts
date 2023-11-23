import { arg, mutationField } from 'nexus'
import { isBase64 } from '@app/utils'
import { ApolloError } from 'apollo-server-express'
import { fromLatLongIntoLocation } from '../../../lib/database/experiences-monuments'
import buckets from '@app/cloudinary-server'
import { Queries } from '../../../lib/appwrite/appwrite'

export default mutationField('createExperience', {
	args: { input: arg({ type: 'CreateExperienceInput' }) },
	type: 'Experience',
	resolve: async (s, args, ctx) => {
		const { collections } = ctx.appwrite

		if (!isBase64(args.input.picture))
			throw new Error('input.imgSrc musts be a valid base64 string')
		if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')

		const monument = await collections.monument.getDocument(
			args.input.connnectedMonumentId,
		)
		if (!monument) throw new ApolloError('No monument was found', '404')

		//checking: question and answer
		if (monument.questionId) {
			const usersAnswer = await collections.usersAnswer.getDocument([
				Queries.usersAnswer.equal('userId', ctx.user.$id),
				Queries.usersAnswer.equal('monumentId', monument._id),
			])

			if (!usersAnswer)
				throw new ApolloError(
					'User did not answer the question so he cant save a picture bellow this monument',
				)
			if (!usersAnswer.answeredCorrectly)
				throw new ApolloError(
					'User answered wrong the question so he cant save a picture bellow this monument',
				)
		}

		const document = await buckets.experiences
			.uploadBase64(args.input.picture)
			.then(async ({ url }) => {
				if (!ctx.isAuthed(ctx.user?.$id))
					throw new ApolloError('User is not Authed', '403')
				return await collections.experience.createDocument({
					connectedMonumentId: args.input.connnectedMonumentId,
					userId: ctx.user.$id,
					pictureUrl: url,
					latitude: Math.round(args.input.location[0]),
					longitude: Math.round(args.input.location[1]),
				})
			})
		return fromLatLongIntoLocation(document)[0]
	},
})
