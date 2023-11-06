import { queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { Preferences } from '@app/ts-types'

export default queryField('createAccount', {
	args: { myId: stringArg(), username: stringArg() },
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to create account', '403')

		const { collections, account } = ctx.appwrite
		const userInfoPromise = collections.userInfo.createDocument({
			myId: args.myId,
			username: args.username,
			userId: ctx.user.$id,
			profilePictureURL: undefined,
		})

		//@ts-ignore
		const updatePrefsPromise = account.updatePrefs<Preferences>({
			mapRange: 6000,
			termsAccepted: true,
		})

		const [userInfo] = await Promise.all([userInfoPromise, updatePrefsPromise])

		return {
			_createdAt: userInfo._createdAt,
			_updatedAt: userInfo._updatedAt,
			_collectionId: userInfo._collectionId,
			_id: userInfo._id,
			_permissions: userInfo._permissions,
			_databaseId: userInfo._databaseId,
			emailVerification: ctx.user.emailVerification,
			myId: userInfo.myId,
			prefs: ctx.user.prefs,
			status: ctx.user.status,
			username: userInfo.username,
			phoneVerification: ctx.user.phoneVerification,
			userId: ctx.user.$id,
			profilePictureURL: userInfo.profilePictureURL,
		}
	},
})
