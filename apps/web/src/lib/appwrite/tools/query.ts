import { Query } from '@app/appwrite-ssr-graphql';
import collections from './collections';

type CollectionName = keyof ReturnType<typeof collections>;
import {
	ExperienceDocument,
	ExperienceLikeDocument,
	MonumentDocument,
	MonumentLikeDocument,
	PlaceDetailDocument,
	TokenDocument,
	UserInfoDocument
} from '@app/ts-types';

const query = {
	userInfo: Query<UserInfoDocument>(),
	experience: Query<ExperienceDocument>(),
	monument: Query<MonumentDocument>(),
	placeDetail: Query<PlaceDetailDocument>(),
	token: Query<TokenDocument>(),
	monumentLike: Query<MonumentLikeDocument>(),
	experienceLike: Query<ExperienceLikeDocument>()
} satisfies Record<CollectionName, any>;

export default query;
