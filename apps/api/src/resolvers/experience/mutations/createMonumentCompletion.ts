import { ApolloError } from 'apollo-server-express'
import { arg, mutationField } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'

export default mutationField('createMonumentCompletion', {
	args: { input: 'CreateMonumentCompletionInput' },
	type: 'MonumentCompletion',
	resolve: async (s, args, ctx) => {
		const { collections } = ctx.appwrite

		if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')

		const monument = await collections.monument.getDocument(args.input.monumentId)
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

		const document = await collections.monumentCompletion.createDocument({
			monumentId: args.input.monumentId,
			userId: ctx.user.$id,
		})

		const res = document
		if (!res) throw new ApolloError('creating experience was no successful')
		return res
	},
})
