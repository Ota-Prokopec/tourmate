import {
	ExperienceDocument,
	ExperienceDocumentCreate,
	MonumentDocument,
	MonumentDocumentCreate,
	TokenDocument,
	TokenDocumentCreate,
	UserInfoDocument,
	UserInfoDocumentCreate,
} from '@app/ts-types'
import appwriteSSR from '@app/appwrite-ssr'

export const collections = (session: string) => {
	const { Collection } = appwriteSSR.setSession(session)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenDocument, TokenDocumentCreate>('account', 'tokens'),
	}
}
