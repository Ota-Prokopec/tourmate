import { ApolloError } from 'apollo-server-express'
import { list, nullable, objectType } from 'nexus'
import { Queries } from '../lib/appwrite/appwrite'
import { fromLatDocumentLongIntoLocationDocument } from '../lib/database/experiences-monuments'
import { getUser } from '../lib/users/getUser'

export default objectType({
	name: 'MonumentCompletion',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('userId')
		t.string('monumentId')
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

		t.field('monument', {
			type: nullable('Monument'),
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				const monument = await collections.monument.getDocument([
					Queries.monument.equal('$id', source.monumentId),
				])

				if (!monument) return null

				const res = fromLatDocumentLongIntoLocationDocument(monument)[0]
				if (!res) return null
				return res
			},
		})
	},
})
