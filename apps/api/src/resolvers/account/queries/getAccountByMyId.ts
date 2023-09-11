import { nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'

import { getAccount } from '@app/user-database-server'
import { Query } from '@app/appwrite-server'

export default queryField('getAccountByMyId', {
	args: { myId: stringArg() },
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('user is not authorizated to create account', '403')
		const { collections } = ctx.appwrite

		const { userId } = await collections.userInfo.getDocument([Query.equal('myId', args.myId)])
		return await getAccount(userId, userId === ctx.user.$id, collections)
	},
})
