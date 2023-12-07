import { nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { getUser } from '../../../lib/users/getUser'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getUser', {
	args: { userId: nullable(stringArg()), myId: nullable(stringArg()) },
	type: 'User',
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

		return await getUser(userId, collections)
	},
})
