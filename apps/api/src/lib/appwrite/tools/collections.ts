import {
	ExperienceDocumentCreate,
	ExperienceGraphqlDocument,
	ExperienceLikeDocumentCreate,
	ExperienceLikeGraphqlDocument,
	MonumentDocumentCreate,
	MonumentGraphqlDocument,
	MonumentLikeDocumentCreate,
	MonumentLikeGraphqlDocument,
	PlaceDetailDocumentCreate,
	PlaceDetailGraphqlDocument,
	TokenDocumentCreate,
	TokenGraphqlDocument,
	UserInfoDocumentCreate,
	UserInfoGraphqlDocument,
} from '@app/ts-types'
import { Types } from '@app/appwrite-ssr-graphql'

export type Collections = ReturnType<typeof collectionsAdmin>
export type CollectionName = keyof ReturnType<typeof collectionsAdmin>

type AppwriteSSRReturnTypeClient = ReturnType<Types.AppwriteSSR['none']>
type AppwriteSSRReturnTypeAdmin = ReturnType<Types.AppwriteSSR['setAdmin']>

export const collectionsClient = (Collection: AppwriteSSRReturnTypeClient['Collection']) => {
	return {
		userInfo: new Collection<UserInfoGraphqlDocument, UserInfoDocumentCreate>('experiences', 'userInfo'),
		experience: new Collection<ExperienceGraphqlDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentGraphqlDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenGraphqlDocument, TokenDocumentCreate>('experiences', 'tokens'),
		placeDetail: new Collection<PlaceDetailGraphqlDocument, PlaceDetailDocumentCreate>('experiences', 'placeDetails'),
		monumentLike: new Collection<MonumentLikeGraphqlDocument, MonumentLikeDocumentCreate>('experiences', 'monument-likes'),
		experienceLike: new Collection<ExperienceLikeGraphqlDocument, ExperienceLikeDocumentCreate>('experiences', 'experience-likes'),
	}
}

export const collectionsAdmin = (Collection: AppwriteSSRReturnTypeAdmin['Collection']) => {
	return {
		userInfo: new Collection<UserInfoGraphqlDocument, UserInfoDocumentCreate>('experiences', 'userInfo'),
		experience: new Collection<ExperienceGraphqlDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentGraphqlDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenGraphqlDocument, TokenDocumentCreate>('experiences', 'tokens'),
		placeDetail: new Collection<PlaceDetailGraphqlDocument, PlaceDetailDocumentCreate>('experiences', 'placeDetails'),
		monumentLike: new Collection<MonumentLikeGraphqlDocument, MonumentLikeDocumentCreate>('experiences', 'monument-likes'),
		experienceLike: new Collection<ExperienceLikeGraphqlDocument, ExperienceLikeDocumentCreate>('experiences', 'experience-likes'),
	}
}
