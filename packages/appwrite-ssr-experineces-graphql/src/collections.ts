import {
	ExperienceDocumentCreate,
	ExperienceGraphqlDocument,
	MonumentDocumentCreate,
	MonumentGraphqlDocument,
	TokenDocumentCreate,
	TokenGraphqlDocument,
	UserInfoDocumentCreate,
	UserInfoGraphqlDocument,
} from '@app/ts-types'
import appwriteSSR from '@app/appwrite-ssr-graphql'

export const collections = (appwrite: ReturnType<typeof appwriteSSR.setCookie>) => {
	const { Collection } = appwrite
	return {
		userInfo: new Collection<UserInfoGraphqlDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceGraphqlDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentGraphqlDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenGraphqlDocument, TokenDocumentCreate>('account', 'tokens'),
	}
}
