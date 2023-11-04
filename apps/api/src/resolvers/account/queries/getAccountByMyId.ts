import { nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'

import { getAccount } from '../../../lib/test/getAccount'
import { Query } from '@app/appwrite-server'

export default queryField('getAccountByMyId', {
	args: { myId: stringArg() },
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to create account', '403')
		const { collections } = ctx.appwrite

		const userInfo = await collections.userInfo.getDocument([
			Query.equal('myId', args.myId),
		])
		if (!userInfo) throw new Error('userInfo not found')

		const { userId } = userInfo
		return await getAccount(userId, userId === ctx.user.$id, collections)
	},
})
