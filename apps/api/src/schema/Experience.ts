import { getAccount } from '../lib/test/getAccount'
import { ApolloError } from 'apollo-server-express'
import { list, nullable, objectType } from 'nexus'

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
		t.field('imgSrc', { type: 'URL' })
		t.field('location', { type: 'Location' })
		t.string('placeDetailId')
		t.string('connectedMonumentId')
		t.field('user', {
			type: 'Account',
			resolve: async (source, args, ctx, info) => {
				let userId = source.userId
				if (!ctx.isAuthed(ctx.user))
					throw new ApolloError('user is not authorizated to create account', '403')
				if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
				if (!userId)
					throw new ApolloError('user is not authorizated to create account', '403')

				const { collections } = ctx.appwrite

				return await getAccount(userId, userId === ctx.user.$id, collections)
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
			type: list('ExperienceLike'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite

				const queries = [
					Queries.monumentLike.equal('monumentId', source._id), // get by monument id
					Queries.monumentLike.limit(6), // only 6 of them
					Queries.monumentLike.notEqual('userId', ctx.user.$id), // not pick me
					//! userid is not working
				]
				const likes = await collections.experienceLike.listDocuments(queries)

				return likes.documents
			},
		})
		t.field('liked', {
			type: nullable('ExperienceLike'),
			resolve: async (source, args, ctx) => {
				if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')
				const { collections, Queries } = ctx.appwrite
				const queries = [
					Queries.monumentLike.equal('monumentId', source._id),
					Queries.monumentLike.equal('userId', ctx.user.$id),
				]
				const likeDoc = await collections.experienceLike.getDocument(queries)
				return likeDoc
			},
		})
	},
})
