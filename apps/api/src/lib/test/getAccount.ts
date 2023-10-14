import { Query } from 'node-appwrite'
import appwrite from '../appwrite/appwrite'
import appwriteServer from '@app/appwrite-server'
import { Preferences } from '@app/ts-types'

export const getAccount = async (
	userId: string,
	withPrefs = false,
	collections: ReturnType<(typeof appwrite)['setCookie']>['collections'],
) => {
	const { users } = appwriteServer.setAdmin()

	const { emailVerification, prefs, status, phoneVerification } = await users.get<Preferences>(userId)

	const userInfo = await collections.userInfo.getDocument([Query.equal('userId', userId)])

	if (!userInfo) throw new Error('userInfo not found')
	return {
		_createdAt: userInfo._createdAt,
		_updatedAt: userInfo._updatedAt,
		_collectionId: userInfo._collectionId,
		_id: userInfo._id,
		_permissions: userInfo._permissions,
		_databaseId: userInfo._databaseId,
		emailVerification: emailVerification,
		myId: userInfo.myId,
		prefs: withPrefs ? prefs : null,
		status: status,
		username: userInfo.username,
		phoneVerification: phoneVerification,
		userId: userInfo.userId,
		profilePictureURL: userInfo.profilePictureURL,
	}
}
