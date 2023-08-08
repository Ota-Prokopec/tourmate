import appwriteServer, { Models, appwriteDocumentKeys } from '@app/appwrite-server'
import { omit } from 'lodash'
import { Query } from 'node-appwrite'

export const getUserIdByMyId = async (myId: string) => {
	const { collections } = appwriteServer.setAdmin()
	const userId: string = (await collections.userInfo.getDocument([Query.equal('myId', myId)])).userId
	return userId
}

export const getUserByMyId = async (myId: string) => {
	const { collections, users } = appwriteServer.setAdmin()
	const userId: string = (await collections.userInfo.getDocument([Query.equal('myId', myId)])).userId
	return await users.get(userId)
}
export const getUserInfoByUserId = async (userId: string) => {
	const { collections } = appwriteServer.setAdmin()
	return await collections.userInfo.getDocument([Query.equal('userId', userId)])
}

export const getUserProfileByUserId = async (userId: string) => {
	const { collections, users } = appwriteServer.setAdmin()

	const userInfo = await collections.userInfo.getDocument([Query.equal('userId', userId)])
	const isActive = (await users.listSessions(userId)).total > 0

	return {
		...omit(userInfo, appwriteDocumentKeys),
		detail: {
			isActive,
		},
	}
}
export const getUserProfileByMyId = async (quiziId: string) => {
	const { collections } = appwriteServer.setAdmin()
	const userId: string = (await collections.userInfo.getDocument([Query.equal('quiziId', quiziId)])).userId
	return await getUserProfileByUserId(userId)
}
/*
export const searchUsers = async (searchText: string, limit = 10) => {
	const { collections, buckets } = appwriteServer.setAdmin()
	const queries: string[] = searchText.startsWith('@') && searchText.length > 1 ? [Query.search('quiziId', searchText)] : searchText.length > 0 && !searchText.startsWith('@') ? [Query.search('name', searchText)] : []
	queries.push(...[Query.orderDesc('$updatedAt'), Query.limit(limit)])
	let users = (await collections.userInfo.listDocuments(queries)).documents
	// * translating profilePictures IDs into URLs
	users = users.map((user) => ({ ...user, profilePicture: buckets.profilePictures.getFileURL(user.profilePicture) }))
	// * adding friends
	//return await Promise.all(users.map((document, i) => getUsersFriends(document.userId, 4).then((friends) => ({ ...document, friends }))))
}

export const getUserProfileByUserId = async (userId: string, user: Models.User<Models.Preferences>) => {
	const { collections, users, buckets } = appwriteServer.setAdmin()

	const userInfo = await collections.userInfo.getDocument([Query.equal('userId', userId)])
	const isActive = (await users.listSessions(userId)).total > 0

	userInfo.profilePicture = buckets.profilePictures.getFileURL(userInfo.profilePicture)

	return {
		userInfo,
		detail: {
			isActive,
		},
	}
}

export const getUserProfileByMyId = async (myId: string, user: Models.User<Models.Preferences>) => {
	const { collections } = appwriteServer.setAdmin()
	const userId: string = (await collections.userInfo.getDocument([Query.equal('myId', myId)])).userId
	return await getUserProfileByUserId(userId, user)
}

export const getUserWithFriends = async (userId: string) => {
	const { collections, buckets } = appwriteServer.setAdmin()
	let [user, friends] = await Promise.all([collections.userInfo.getDocument([Query.equal('userId', userId)]), getUsersFriends(userId, 4)])
	user = { ...user, profilePicture: buckets.profilePictures.getFileURL(user.profilePicture) }
	return {
		...user,
		friends,
	}
}
*/

export const getAccountByUserId = async (userId: string) => {
	const { users } = appwriteServer.setAdmin()
	return await users.get(userId)
}
