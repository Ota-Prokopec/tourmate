import { Databases } from 'appwrite'
//import { Collection as Node } from './server/appwriteNode/appwrite_node';
import { createCollectionDispatcher } from '../src/Ludvik/main'
import type { UserInfoDocument, UserInfoDocumentCreate } from '@app/ts-types'

export default (databases: Databases) => {
	const Collection = createCollectionDispatcher(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
	}
}
