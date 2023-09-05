import { getAccount } from '@app/user-database-server'
import { ApolloError } from 'apollo-server-express'
import { objectType } from 'nexus'

export default objectType({
	name: 'Experience',
	definition: (t) => {
		t.string('userId')
		t.string('imgSrc')
		t.list.float('location')
		t.string('createdAt')
		t.string('updatedAt')
		t.string('collectionId')
		t.string('id')
		t.list.string('permissions')
		t.string('databaseId')
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
	},
})
