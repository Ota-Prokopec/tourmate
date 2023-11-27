import { nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { getUser } from '../../../lib/users/getUser'
import { pick, omit } from 'lodash'
export default queryField('getAccount', {
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to get account', '403')

		const { collections } = ctx.appwrite

		const userInfo = await getUser(ctx.user.$id, collections)

		return {
			...omit(userInfo, '_id'),
			...pick(ctx.user, 'emailVerification', 'status', 'phoneVerification', 'prefs'),
			_documentId: userInfo._id,
		}
	},
})
