import { fromLatLongIntoLocation } from '../../../lib/database/experiences-monuments'
import { isBase64 } from '@app/utils'
import { arg, mutationField } from 'nexus'
import cloudinary from '@app/cloudinary-server'
import {
	Question,
	AnswerType,
	TextTypeAnswerGraphqlDocument,
	RadioTypeAnswerGraphqlDocument,
	NumberTypeAnswerGraphqlDocument,
	isQuestionTypeNumber,
	isQuestionTypeText,
	isQuestionTypeRadio,
	GraphqlDocument,
	Answer,
} from '@app/ts-types'

import { ApolloError } from 'apollo-server-express'
import appwrite from '../../../lib/appwrite/appwrite'
import { permissions } from '@app/appwrite-ssr-graphql'

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
					pictureURL: file?.url,
					questionId: question?._id,
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
