import { permissions } from '@app/appwrite-ssr-graphql'
import type { Answer } from '@app/ts-types'
import { ApolloError } from 'apollo-server-express'
import { mutationField, stringArg } from 'nexus'
import appwrite from '../../../lib/appwrite/appwrite'

export default mutationField('answerQuestion', {
	args: { monumentId: stringArg(), answer: 'StringOrNumber' },
	type: 'UsersAnswerToQuestion',
	resolve: async (s_, args, ctx) => {
		const { collections } = ctx.appwrite
		const { collections: adminCollections } = appwrite.setAdmin()

		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authed', '401')

		const monument = await collections.monument.getDocument(args.monumentId)
		if (!monument) throw new Error('Monument bellow this id was not found')

		const { questionId } = monument
		if (!questionId) throw new Error('This monument has no question')
		const question = await collections.question.getDocument(questionId)
		if (!question) throw new Error('Question bellow this id was not found')

		let answerDoc: Answer | null = null
		if (question.answerType === 'text') {
			answerDoc = await adminCollections.answerTypeText.getDocument(question.answerId)
		} else if (question.answerType === 'number') {
			answerDoc = await adminCollections.answerTypeNumber.getDocument(question.answerId)
		} else
			answerDoc = await adminCollections.answerTypeRadio.getDocument(question.answerId)

		if (!answerDoc) throw new Error('Answer bellow this question was not found')

		const result: boolean =
			answerDoc.correctAnswer.toString().localeCompare(args.answer.toString()) === 0

		const usersAnswerDocument = await adminCollections.usersAnswer.createDocument(
			{
				monumentId: monument._id,
				answeredCorrectly: result,
				userId: ctx.user.$id,
			},
			permissions.owner(ctx.user.$id, monument.userId), //you set permission to yourself but also to the creator that he could delete it when he deletes the entire monument
		)

		return {
			answeredCorrectly: result,
		}
	},
})
