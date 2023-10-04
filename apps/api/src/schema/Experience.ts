import { getAccount } from '../lib/test/getAccount'
import { ApolloError } from 'apollo-server-express'
import { objectType } from 'nexus'

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
		t.field('user', {
			type: 'Account',
			resolve: async (source, args, ctx, info) => {
				let userId = source.userId
				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('user is not authorizated to create account', '403')
				if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
				if (!userId) throw new ApolloError('user is not authorizated to create account', '403')

				const { collections } = ctx.appwrite

				return await getAccount(userId, userId === ctx.user.$id, collections)
			},
		})
		t.field('placeDetail', {
			type: 'PlaceDetail',
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				const placeDetail = await collections.placeDetail.getDocument(source.placeDetailId)
				if (!placeDetail) throw new Error('placeDetail was not found')
				return placeDetail
			},
		})
	},
})