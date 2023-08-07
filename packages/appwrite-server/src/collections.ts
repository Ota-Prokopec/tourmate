import { Databases } from 'node-appwrite'
import { ExperienceDocument, ExperienceDocumentCreate, UserInfoDocument, UserInfoDocumentCreate } from '@app/ts-types'
import database from './database'

export default (databases: Databases) => {
	const Collection = database(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
	}
}
