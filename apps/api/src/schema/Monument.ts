import { appwriteGraphqlKeys } from '@app/appwrite-ssr-graphql'
import type { Answer } from '@app/ts-types'
import { isLocation, locationQueries } from '@app/utils'
import { ApolloError } from 'apollo-server-express'
import lodash from 'lodash'
import { list, nullable, objectType } from 'nexus'
import { defaultRangeMeters } from '../arguments/LocationInput'
import appwrite, { Queries } from '../lib/appwrite/appwrite'
import { fromLatDocumentLongIntoLocationDocument } from '../lib/database/experiences-monuments'
import { getUser } from '../lib/users/getUser'

export default objectType({
	name: 'Monument',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.field('location', { type: 'Location' })
		t.string('userId')
		t.string('name')
		t.nullable.string('questionId')
		t.nullable.string('about')
		t.list.field('topics', { type: 'Topic' })
		t.string('placeDetailId')
		t.list.field('transports', { type: 'Transport' })
		t.field('pictureURL', {
			type: 'URL',
			description: 'This it an URL not id of picture',
		})
		t.field('user', {
			type: 'User',
			resolve: async (source, args, ctx, info) => {
				let userId = source.userId
				if (!ctx.isAuthed(ctx.user))
					throw new ApolloError(
						'user is not authorizated to perform this request (Experiences)',
						'403',
					)
				if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in

				const { collections } = ctx.appwrite
				return await getUser(userId, collections)
			},
		}),
			t.field('nearExperiences', {
				type: list('Experience'),
				resolve: async (source, args, ctx, info) => {
					const { collections } = ctx.appwrite
					if (!isLocation(source.location)) throw new Error('location is not valid')

					const queries = [
						...locationQueries(
							source.location,
							ctx.user?.prefs.mapRange ?? defaultRangeMeters,
						),
					]
					return fromLatDocumentLongIntoLocationDocument(
						...(await collections.experience.listDocuments(queries)).documents,
					)
				},
			})
		t.field('placeDetail', {
			type: 'PlaceDetail',
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				const placeDetail = await collections.placeDetail.getDocument(
					source.placeDetailId,
				)
				if (!placeDetail) throw new Error('placeDetail was not found')
				return placeDetail
			},
		})
		t.field('likes', {
			type: list('MonumentLike'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite

				const queries = [
					Queries.monumentLike.equal('monumentId', source._id), // get by monument id
					Queries.monumentLike.limit(3), // only 6 of them
					Queries.monumentLike.notEqual('userId', ctx.user.$id), // dont pick me
				]

				const likes = await collections.monumentLike.listDocuments(queries)

				return likes.documents
			},
		})
		t.field('liked', {
			type: nullable('MonumentLike'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')

				const { collections, Queries } = ctx.appwrite
				const queries = [
					Queries.monumentLike.equal('monumentId', source._id),
					Queries.monumentLike.equal('userId', ctx.user.$id),
				]
				const likeDoc = await collections.monumentLike.getDocument(queries)
				return likeDoc
			},
		})
		t.field('connectedExperiences', {
			type: list('Experience'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite
				const queries = [Queries.experience.equal('connectedMonumentId', source._id)]
				const expDocs = (await collections.experience.listDocuments(queries)).documents
				return fromLatDocumentLongIntoLocationDocument(...expDocs)
			},
		})
		t.field('usersConnectedExperiences', {
			type: list('Experience'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite
				const queries = [
					Queries.experience.equal('connectedMonumentId', source._id),
					Queries.experience.equal('userId', ctx.user.$id),
				]
				const expDocs = (await collections.experience.listDocuments(queries)).documents
				return fromLatDocumentLongIntoLocationDocument(...expDocs)
			},
		})

		t.field('question', {
			type: nullable('Question'),
			resolve: async (source, args, ctx) => {
				if (!source.questionId) return null
				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authed')

				const { collections } = appwrite.setAdmin() // set admin that you could get answers without being the owner
				const userIsOwner = source.userId === ctx.user?.$id

				const questionDocument = await collections.question.getDocument(source.questionId)

				if (!questionDocument) throw new Error('There is no question bellow this id')
				let answer: Answer | null = null

				if (questionDocument.answerType === 'text') {
					answer = await collections.answerTypeText.getDocument(questionDocument.answerId)
				} else if (questionDocument.answerType === 'number') {
					answer = await collections.answerTypeNumber.getDocument(
						questionDocument.answerId,
					)
				} else {
					answer = await collections.answerTypeRadio.getDocument(
						questionDocument.answerId,
					)
				}

				return {
					...lodash.pick(questionDocument, ...appwriteGraphqlKeys),
					type: questionDocument.answerType,
					correctAnswer: userIsOwner ? answer?.correctAnswer : null,
					question: questionDocument.question,
					pickingAnswers: answer?.pickingAnswers,
				}
			},
		})
		t.field('usersAnswerToQuestion', {
			type: nullable('UsersAnswerToQuestion'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authed', '401')
				const { collections } = ctx.appwrite

				const answerDocument = await collections.usersAnswer.getDocument([
					Queries.usersAnswer.equal('userId', ctx.user.$id),
					Queries.usersAnswer.equal('monumentId', source._id),
				])

				if (!answerDocument) return null

				return { answeredCorrectly: answerDocument.answeredCorrectly }
			},
		})
	},
})
