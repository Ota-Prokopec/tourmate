import { Databases } from 'node-appwrite'
import { UserInfoDocument, UserInfoDocumentCreate } from '@app/ts-types'
import database from './database'

export default (databases: Databases) => {
	const Collection = database(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
	}
}
