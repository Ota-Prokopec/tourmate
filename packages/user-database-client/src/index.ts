import { type Models, Query } from 'appwrite'
import { collections, user as userStore } from '@app/appwrite-client'

let user: Models.Account<Models.Preferences>
userStore.getUser().then((u) => {
	if (u) user = u
})

export const searchUsers = async (searchText: string, limit?: number) => {
	if (searchText.startsWith('@')) {
		return (
			await collections.userInfo.listDocuments(
				searchText.length > 1
					? [Query.search('myId', searchText), Query.orderDesc('$updatedAt'), Query.limit(limit || 10), Query.notEqual('userId', user.$id)]
					: [Query.orderDesc('$updatedAt'), Query.limit(limit || 10), Query.notEqual('userId', user.$id)],
			)
		).documents
	} else if (searchText) return (await collections.userInfo.listDocuments([Query.search('name', searchText), Query.orderDesc('$updatedAt'), Query.limit(limit || 10), Query.notEqual('userId', user.$id)])).documents
	else return (await collections.userInfo.listDocuments([Query.orderDesc('$updatedAt'), Query.limit(limit || 10), Query.notEqual('userId', user.$id)])).documents
}
