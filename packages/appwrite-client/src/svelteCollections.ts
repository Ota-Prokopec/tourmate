import { Databases } from 'appwrite'
//import { Collection as Node } from './server/appwriteNode/appwrite_node';
import { createCollectionDispatcher } from '../src/svelte/main'
import type {
	ExperienceDocument,
	ExperienceDocumentCreate,
	ExperienceLikeDocument,
	ExperienceLikeDocumentCreate,
	MonumentDocument,
	MonumentDocumentCreate,
	MonumentLikeDocument,
	MonumentLikeDocumentCreate,
	PlaceDetailDocument,
	PlaceDetailDocumentCreate,
	TokenDocument,
	TokenDocumentCreate,
	UserInfoDocument,
	UserInfoDocumentCreate,
} from '@app/ts-types'

export default (databases: Databases) => {
	const Collection = createCollectionDispatcher(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('experiences', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenDocument, TokenDocumentCreate>('experiences', 'tokens'),
		placeDetail: new Collection<PlaceDetailDocument, PlaceDetailDocumentCreate>('experiences', 'placeDetails'),
		monumentLike: new Collection<MonumentLikeDocument, MonumentLikeDocumentCreate>('experiences', 'monument-likes'),
		experienceLike: new Collection<ExperienceLikeDocument, ExperienceLikeDocumentCreate>('experiences', 'experience-likes'),
	}
}
