import {
	ExperienceDocumentCreate,
	ExperienceGraphqlDocument,
	MonumentDocumentCreate,
	MonumentGraphqlDocument,
	PlaceDetailDocumentCreate,
	PlaceDetailGraphqlDocument,
	TokenDocumentCreate,
	TokenGraphqlDocument,
	UserInfoDocumentCreate,
	UserInfoGraphqlDocument,
} from '@app/ts-types'
import { Types } from '@app/appwrite-ssr-graphql'
import appwriteSSR from '@app/appwrite-ssr-graphql'

export const collections = (Collection: Types.AppwriteSSR['Collection']) => {
	return {
		userInfo: new Collection<UserInfoGraphqlDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceGraphqlDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentGraphqlDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenGraphqlDocument, TokenDocumentCreate>('account', 'tokens'),
		placeDetail: new Collection<PlaceDetailGraphqlDocument, PlaceDetailDocumentCreate>('experiences', 'placeDetails'),
	}
}
