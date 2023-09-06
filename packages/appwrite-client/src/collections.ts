import type { Client, Databases } from 'appwrite'
import type {
	ExperienceDocument,
	ExperienceDocumentCreate,
	MonumentDocument,
	MonumentDocumentCreate,
	TokenDocument,
	TokenDocumentCreate,
	UserInfoDocument,
	UserInfoDocumentCreate,
} from '@app/ts-types'
import database from './common/database'

export default (client: Client) => {
	const Collection = database(client)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenDocument, TokenDocumentCreate>('account', 'tokens'),
	}
}
