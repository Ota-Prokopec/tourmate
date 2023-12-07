import appwrite, { Queries } from '../appwrite/appwrite'

export const getUser = async (
	userId: string,
	collections: ReturnType<(typeof appwrite)['setCookie']>['collections'],
) => {
	const query = Queries.userInfo.equal('userId', userId)

	const userInfo = await collections.userInfo.getDocument([query])

	if (!userInfo) throw new Error('userInfo not found')
	return {
		_createdAt: userInfo._createdAt,
		_updatedAt: userInfo._updatedAt,
		_collectionId: userInfo._collectionId,
		_id: userInfo._id,
		_permissions: userInfo._permissions,
		_databaseId: userInfo._databaseId,
		myId: userInfo.myId,
		username: userInfo.username,

		userId: userInfo.userId,
		profilePictureURL: userInfo.profilePictureURL,
	}
}
