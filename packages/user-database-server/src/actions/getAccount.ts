import { Query } from 'node-appwrite'
import appwrite from '@app/appwrite-ssr-experiences'
import appwriteServer from '@app/appwrite-server'

export const getAccount = async (
	userId: string,
	withPrefs = false,
	collections: ReturnType<(typeof appwrite)['setCookie']>['collections'],
) => {
	const { users } = appwriteServer.setAdmin()

	const { emailVerification, prefs, status, phoneVerification } = await users.get(userId)
	const accountDocCreateRes = await collections.userInfo.getDocument([Query.equal('userId', userId)])

	return {
		createdAt: accountDocCreateRes.$createdAt,
		emailVerification: emailVerification,
		myId: accountDocCreateRes.myId,
		prefs: withPrefs ? prefs : null,
		staus: status,
		username: accountDocCreateRes.username,
		phoneVerification: phoneVerification,
		updatedAt: accountDocCreateRes.$updatedAt,
		userId: accountDocCreateRes.userId,
		profilePictureURL: accountDocCreateRes.profilePictureURL,
	}
}
