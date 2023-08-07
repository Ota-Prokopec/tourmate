import type { Databases } from 'appwrite'
import type { ExperienceDocument, ExperienceDocumentCreate, UserInfoDocument, UserInfoDocumentCreate } from '@app/ts-types'
import database from './common/database'

export default (databases: Databases) => {
	const Collection = database(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
	}
}
