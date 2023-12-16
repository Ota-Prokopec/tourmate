import cloudinary from '@app/cloudinary-server'
import {
	isQuestionTypeNumber,
	isQuestionTypeRadio,
	isQuestionTypeText,
	type Answer,
	type AnswerType,
	type GraphqlDocument,
	type Question,
	Location,
} from '@app/ts-types'
import { arg, mutationField } from 'nexus'
import { fromLatDocumentLongIntoLocationDocument } from '../../../lib/database/experiences-monuments'
import { permissions } from '@app/appwrite-ssr-graphql'
import { ApolloError } from 'apollo-server-express'
import appwrite, { Queries } from '../../../lib/appwrite/appwrite'
import { notifications } from '@app/firebase-server'
import { locationQueries } from '@app/utils'

/**90km => 90 000meters */
const notificationsRange = 90_000

export default mutationField('createMonument', {
	type: 'Monument',
	args: { input: arg({ type: 'CreateMonumentInput' }) },
	resolve: async (s, args, ctx) => {
		try {
			if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
			const { collections } = ctx.appwrite

			// create image for monument
			const filePromise = cloudinary.monuments.uploadBase64(args.input.picture)

			//create place-detail for monument
			const placeDetailPromise = collections.placeDetail.createDocument(
				{
					name: args.input.placeName,
				},
				[ctx.user],
			)

			//add optional question
			const question = await saveQuestion(
				args.input.question,
				permissions.owner(ctx.user.$id),
			)

			// all promises before the monument it selfs will be created
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
					pictureURL: file.url,
					questionId: question?._id,
				},
				[ctx.user],
			)

			const res = fromLatDocumentLongIntoLocationDocument(document)[0]
			if (!res) throw new ApolloError('creating monument was not successful')

			const notificationsSendingSuccess = await sendNotification(res._id, res.location)

			return res
		} catch (error) {
			console.log(error)
			throw new Error('')
		}
	},
})

const saveQuestion = async (
	question:
		| (Omit<Question<AnswerType>, 'pickingAnswers'> & {
				pickingAnswers?: Question<AnswerType>['pickingAnswers'] | null
		  })
		| undefined
		| null,
	permissions: string[],
): Promise<
	| GraphqlDocument<
			Omit<Question<AnswerType>, 'pickingAnswers'> & {
				pickingAnswers?: Question<AnswerType>['pickingAnswers']
			}
	  >
	| undefined
> => {
	if (!question) return undefined

	const { collections } = appwrite.setAdmin()

	let answer: Answer

	if (isQuestionTypeText(question)) {
		answer = await collections.answerTypeText.createDocument(
			{
				correctAnswer: question.correctAnswer,
			},
			permissions,
		)
	} else if (isQuestionTypeNumber(question)) {
		answer = await collections.answerTypeNumber.createDocument(
			{
				correctAnswer: question.correctAnswer,
			},
			permissions,
		)
	} else if (isQuestionTypeRadio(question)) {
		answer = await collections.answerTypeRadio.createDocument(
			{
				correctAnswer: question.correctAnswer,
				pickingAnswers: question.pickingAnswers,
			},
			permissions,
		)
	} else throw new Error('Uknown type of answer')

	const res = await collections.question.createDocument(
		{
			question: question.question,
			answerType: question.type,
			answerId: answer._id,
		},
		permissions,
	)

	return {
		correctAnswer: answer.correctAnswer,
		pickingAnswers: answer.pickingAnswers,
		type: question.type,
		...res,
	}
}

const sendNotification = async (monumentId: string, monumentLocation: Location) => {
	const { collections } = appwrite.setAdmin()
	const locationQuery = locationQueries(monumentLocation, notificationsRange)

	const userIds: string[] /**userIds that will get the notification */ = await (
		await collections.locationForNotification.listDocuments(locationQuery)
	).documents.map((document) => document.userId)

	//if there is no user that the notification would be sent to => we wont even search for tokens
	if (userIds.length === 0) return null

	const tokens = (
		await collections.token.listDocuments([Queries.token.equal('userId', userIds)])
	).documents.map((document) => document.fcmFirebaseToken)

	return await notifications.create(
		{ data: { type: 'newMonument', monumentId: monumentId } },
		tokens,
	)
}
