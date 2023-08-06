import type { Databases } from 'appwrite'
import type { UserInfoDocument, UserInfoDocumentCreate } from '@app/ts-types'
import database from './common/database'

export default (databases: Databases) => {
	const Collection = database(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
	}
}
