import { getAccount } from '@app/user-database-server'
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
		t.field('user', {
			type: 'Account',
			resolve: async (source, args, ctx, info) => {
				let userId = source.userId
				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('user is not authorizated to create account', '403')
				if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
				if (!userId) throw new ApolloError('user is not authorizated to create account', '403')

				const { collections } = ctx.appwrite
				console.log(userId)

				return await getAccount(userId, userId === ctx.user.$id, collections)
			},
		})
	},
})
