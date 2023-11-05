import { nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { getAccount } from '../../../lib/test/getAccount'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getAccount', {
	args: { userId: nullable(stringArg()), myId: nullable(stringArg()) },
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to get account', '403')

		const { collections } = ctx.appwrite

		let { userId, myId } = args

		if (myId && !userId) {
			const userInfo = await collections.userInfo.getDocument([
				Queries.userInfo.equal('myId', myId),
			])
			if (!userInfo) throw new Error('userInfo not found')
			userId = userInfo.userId
		}

		if (!userId) userId = ctx.user.$id //if no input it will be the user that is logged in
		if (!userId) throw new Error('user is not Authed')

		return await getAccount(userId, userId === ctx.user.$id, collections)
	},
})
