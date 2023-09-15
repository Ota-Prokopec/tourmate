import { nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { AccountGetOutput } from '../../../schema/auth/account'
import { getAccount } from '@app/user-database-server'

export default queryField('getAccount', {
	args: { userId: nullable(stringArg()) },
	type: 'Account',
	resolve: async (s_, args, ctx, info): Promise<AccountGetOutput> => {
		let userId = args.userId
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('user is not authorizated to create account', '403')
		if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
		if (!userId) throw new Error('user is not Authed')

		const { collections } = ctx.appwrite
		console.log(userId)

		return await getAccount(userId, userId === ctx.user.$id, collections)
	},
})
