import { getUser } from '../lib/users/getUser'
import { ApolloError } from 'apollo-server-express'
import { list, nullable, objectType } from 'nexus'
import { Queries } from '../lib/appwrite/appwrite'
import { fromLatDocumentLongIntoLocationDocument } from '../lib/database/experiences-monuments'
import { isLocation } from '@app/utils'

export default objectType({
	name: 'Experience',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('userId')
		t.field('pictureUrl', { type: 'URL' })
		t.field('location', { type: 'Location' })
		t.string('connectedMonumentId')
		t.field('user', {
			type: 'User',
			resolve: async (source, args, ctx, info) => {
				let userId = source.userId
				if (!ctx.isAuthed(ctx.user))
					throw new ApolloError('user is not authorizated to create account', '403')
				if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
				if (!userId)
					throw new ApolloError('user is not authorizated to create account', '403')

				const { collections } = ctx.appwrite

				return await getUser(userId, collections)
			},
		})

		t.field('likes', {
			type: list('ExperienceLike'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite

				const queries = [
					Queries.experienceLike.equal('experienceId', source._id), // get by monument id
					Queries.experienceLike.limit(6), // only 6 of them
					Queries.experienceLike.notEqual('userId', ctx.user.$id), // not pick me
					//! userid is not working
				]
				const likes = await collections.experienceLike.listDocuments(queries)

				return likes.documents
			},
		})
		t.field('liked', {
			type: nullable('ExperienceLike'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite
				const queries = [
					Queries.experienceLike.equal('experienceId', source._id),
					Queries.experienceLike.equal('userId', ctx.user.$id),
				]
				const likeDoc = await collections.experienceLike.getDocument(queries)
				return likeDoc
			},
		})
		t.field('connectedMonument', {
			type: nullable('Monument'),
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				const monument = await collections.monument.getDocument([
					Queries.monument.equal('$id', source.connectedMonumentId),
				])

				if (!monument) return null

				const res = fromLatDocumentLongIntoLocationDocument(monument)[0]
				if (!res) return null
				return res
			},
		})
	},
})
