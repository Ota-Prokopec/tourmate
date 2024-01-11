import { objectType } from 'nexus'
import { getUser } from '../lib/users/getUser'
import { Queries } from '../lib/appwrite/appwrite'
import { fromLatDocumentLongIntoLocationDocument } from '../lib/database/experiences-monuments'
import { ApolloError } from 'apollo-server-express'

export default objectType({
	name: 'MonumentLike',
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
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				return await getUser(source.userId, collections)
			},
		}),
			t.field('monument', {
				type: 'Monument',
				resolve: async (source, args, ctx) => {
					const { collections } = ctx.appwrite

					const monument = await collections.monument.getDocument([
						Queries.monument.equal('$id', source.monumentId),
					])

					if (!monument) throw new ApolloError('The monument does not exist')

					const res = fromLatDocumentLongIntoLocationDocument(monument)[0]
					if (!res) throw new ApolloError('There is no document, please check this')

					return res
				},
			})
	},
})
