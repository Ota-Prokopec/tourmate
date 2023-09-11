import { Databases } from 'appwrite'
//import { Collection as Node } from './server/appwriteNode/appwrite_node';
import { createCollectionDispatcher } from '../src/svelte/main'
import type {
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

export default (databases: Databases) => {
	const Collection = createCollectionDispatcher(databases)

	return {
		userInfo: new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
		experience: new Collection<ExperienceDocument, ExperienceDocumentCreate>('experiences', 'experiences'),
		monument: new Collection<MonumentDocument, MonumentDocumentCreate>('experiences', 'monuments'),
		token: new Collection<TokenDocument, TokenDocumentCreate>('account', 'tokens'),
		placeDetail: new Collection<PlaceDetailDocument, PlaceDetailDocumentCreate>('experiences', 'placeDetails'),
	}
}
