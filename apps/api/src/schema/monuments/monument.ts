import { getListOfExperineceByLocation } from '@app/experience-database-server-graphql'
import { isLocation } from '@app/ts-types'
import { getAccount } from '@app/user-database-server'
import { ApolloError } from 'apollo-server-express'
import { list, objectType } from 'nexus'

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
		t.string('creatorUserId')
		t.string('name')
		t.nullable.string('about')
		t.string('placeDetailId')
		t.nullable.field('pictureURL', { type: 'URL', description: 'This it an URL not id of picture' })
		t.field('creator', {
			type: 'Account',
			resolve: async (source, args, ctx, info) => {
				let userId = source.creatorUserId
				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('user is not authorizated to create account', '403')
				if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
				if (!userId) throw new ApolloError('user is not authorizated to create account', '403')

				const { collections } = ctx.appwrite
				return await getAccount(userId, userId === ctx.user.$id, collections)
			},
		}),
			t.field('nearExperiences', {
				type: list('Experience'),
				resolve: async (source, args, ctx, info) => {
					const { collections } = ctx.appwrite
					if (!isLocation(source.location)) throw new Error('location is not valid')

					return await getListOfExperineceByLocation({ location: source.location, zoom: 10, limit: 20, range: 5 }, collections)
				},
			})
		t.field('details', {
			type: 'PlaceDetail',
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				const detail = await collections.placeDetail.getDocument(source.placeDetailId)
				return detail
			},
		})
	},
})
