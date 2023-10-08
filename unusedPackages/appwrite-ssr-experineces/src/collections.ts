import {
	ExperienceDocument,
	ExperienceDocumentCreate,
	MonumentDocument,
	MonumentDocumentCreate,
	PlaceDetailDocument,
	PlaceDetailDocumentCreate,
	TokenDocument,
	TokenDocumentCreate,
	UserInfoDocument,
	UserInfoDocumentCreate,
} from '@app/ts-types'
import appwriteSSR from '@app/appwrite-ssr'

export const collections = (appwrite: ReturnType<typeof appwriteSSR.setCookie>) => {
	const { Collection } = appwrite
	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('experiences', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenDocument, TokenDocumentCreate>('experiences', 'tokens'),
		placeDetail: new Collection<PlaceDetailDocument, PlaceDetailDocumentCreate>('experiences', 'placeDetails'),
	}
}
