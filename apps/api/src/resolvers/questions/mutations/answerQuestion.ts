import { Answer } from '@app/ts-types'
import { ApolloError } from 'apollo-server-express'
import { mutationField, stringArg } from 'nexus'

export default mutationField('answerQuestion', {
	args: { monumentId: stringArg(), answer: 'StringOrNumber' },
	type: 'UsersAnswerToQuestion',
	resolve: async (s_, args, ctx) => {
		const { collections } = ctx.appwrite

		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authed', '401')

		const monument = await collections.monument.getDocument(args.monumentId)
		if (!monument) throw new Error('Monument bellow this id was not found')

		const { questionId } = monument
		if (!questionId) throw new Error('This monument has no question')
		const question = await collections.question.getDocument(questionId)
		if (!question) throw new Error('Question bellow this id was not found')

		let answerDoc: Answer | null
		if (question.answerType === 'text') {
			answerDoc = await collections.answerTypeText.getDocument(question.answerId)
		} else if (question.answerType === 'number') {
			answerDoc = await collections.answerTypeNumber.getDocument(question.answerId)
		} else answerDoc = await collections.answerTypeRadio.getDocument(question.answerId)

		if (!answerDoc) throw new Error('Answer bellow this question was not found')

		const result: boolean =
			answerDoc.correctAnswer.toString().localeCompare(args.answer.toString()) === 0

		// const usersAnswerDocument = await collections.usersAnswer.createDocument({
		// 	monumentId: monument._id,
		// 	answeredCorrectly: result,
		// 	userId: ctx.user.$id,
		// })
		//FIXME: record the answer into appwrite database

		return {
			answeredCorrectly: result,
		}
	},
})
