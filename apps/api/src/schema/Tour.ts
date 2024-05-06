import { list, objectType } from 'nexus'
import { Queries } from '../lib/appwrite/appwrite'
import { fromLatDocumentLongIntoLocationDocument } from '../lib/database/experiences-monuments'
import { ApolloError } from 'apollo-server-express'

export default objectType({
	name: 'Tour',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('userId')
		t.string('tourName')
		t.list.string('monumentIds')
		t.field('creator', {
			type: 'User',
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite

				const queries = [Queries.userInfo.equal('userId', source.userId)]

				const userInfo = await collections.userInfo.getDocument(queries)

				if (!userInfo) throw new ApolloError('User with the id dows not exist')

				return userInfo
			},
		})
		t.field('monuments', {
			type: list('Monument'),
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite

				const queries = [
					Queries.monument.equal('$id', source.monumentIds),
					Queries.monument.limit(source.monumentIds.length),
				]

				const monuments = await collections.monument.listDocuments(queries)

				const res = fromLatDocumentLongIntoLocationDocument(...monuments.documents)
				return res
			},
		})
		t.field('usersTourCheckpointsCompletionData', {
			type: list('TourCheckpointCompletion'),
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite

				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authenticated')

				const queries = [
					Queries.tourCheckpointCompletion.equal('monumentId', source.monumentIds), //monumentId = monument.id
					Queries.tourCheckpointCompletion.equal('tourId', source._id), //tourId = tour.id
					Queries.tourCheckpointCompletion.equal('userId', ctx.user.$id), //userId = user.id
				]

				const checkpointsCompletions =
					await collections.tourCheckpointCompletion.listDocuments(queries)

				return checkpointsCompletions.documents
			},
		})
	},
})
