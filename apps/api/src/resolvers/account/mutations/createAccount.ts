import { owner } from '@app/appwrite-permissions'
import { ApolloError } from 'apollo-server-express'
import { ID } from 'appwrite'
import { queryField, stringArg } from 'nexus'

export default queryField('createAccount', {
	args: { myId: stringArg(), username: stringArg(), language: 'Language' },
	type: 'Account',
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to create account', '403')

		const { collections, account } = ctx.appwrite

		const updatePrefs = await account.updatePreferences({
			mapRange: 6000,
			termsAccepted: true,
			colorTheme: 'light',
			language: args.language,
		})

		const userInfoPromise = collections.userInfo.createDocument(
			{
				myId: args.myId,
				username: args.username,
				userId: ctx.user.$id,
				profilePictureURL: undefined,
			},
			owner(ctx.user.$id),
			ID.unique(),
		)

		const [userInfo] = await Promise.all([userInfoPromise])

		return {
			_createdAt: userInfo._createdAt,
			_updatedAt: userInfo._updatedAt,
			_collectionId: userInfo._collectionId,
			_documentId: userInfo._id,
			_permissions: userInfo._permissions,
			_databaseId: userInfo._databaseId,
			emailVerification: ctx.user.emailVerification,
			myId: userInfo.myId,
			prefs: updatePrefs.prefs,
			status: ctx.user.status,
			username: userInfo.username,
			phoneVerification: ctx.user.phoneVerification,
			userId: ctx.user.$id,
			profilePictureURL: userInfo.profilePictureURL,
		}
	},
})
