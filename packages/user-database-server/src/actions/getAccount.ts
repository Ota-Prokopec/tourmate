import { Query } from 'node-appwrite'
import appwrite from '@app/appwrite-ssr-experiences-graphql'
import appwriteServer from '@app/appwrite-server'
import { Preferences } from '@app/ts-types'

export const getAccount = async (
	userId: string,
	withPrefs = false,
	collections: ReturnType<(typeof appwrite)['setCookie']>['collections'],
) => {
	const { users } = appwriteServer.setAdmin()

	const { emailVerification, prefs, status, phoneVerification } = await users.get<Preferences>(userId)

	const accountDocCreateRes = await collections.userInfo.getDocument([Query.equal('userId', userId)])

	return {
		_createdAt: accountDocCreateRes._createdAt,
		_updatedAt: accountDocCreateRes._updatedAt,
		_collectionId: accountDocCreateRes._collectionId,
		_id: accountDocCreateRes._id,
		_permissions: accountDocCreateRes._permissions,
		_databaseId: accountDocCreateRes._databaseId,
		emailVerification: emailVerification,
		myId: accountDocCreateRes.myId,
		prefs: withPrefs ? prefs : null,
		staus: status,
		username: accountDocCreateRes.username,
		phoneVerification: phoneVerification,
		userId: accountDocCreateRes.userId,
		profilePictureURL: accountDocCreateRes.profilePictureURL,
	}
}
