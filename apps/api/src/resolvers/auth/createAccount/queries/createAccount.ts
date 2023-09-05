import { queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'

export default queryField('createAccount', {
	args: { myId: stringArg(), username: stringArg() },
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('user is not authorizated to create account', '403')

		const { collections } = ctx.appwrite
		const accountDocCreateRes = await collections.userInfo.createDocument({
			myId: args.myId,
			username: args.username,
			userId: ctx.user.$id,
			profilePictureURL: undefined,
		})

		return {
			createdAt: accountDocCreateRes.$createdAt,
			emailVerification: ctx.user.emailVerification,
			id: ctx.user.$id,
			myId: accountDocCreateRes.myId,
			prefs: ctx.user.prefs,
			staus: ctx.user.status,
			username: accountDocCreateRes.username,
			phoneVerification: ctx.user.phoneVerification,
			updatedAt: accountDocCreateRes.$updatedAt,
			userId: ctx.user.$id,
		}
	},
})
