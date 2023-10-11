import { Query } from '@app/appwrite-ssr-graphql'
import { CollectionName } from './collections'

import {
	ExperienceGraphqlDocument,
	ExperienceLikeGraphqlDocument,
	MonumentGraphqlDocument,
	MonumentLikeGraphqlDocument,
	PlaceDetailGraphqlDocument,
	TokenGraphqlDocument,
	UserInfoGraphqlDocument,
} from '@app/ts-types'

const queries = {
	userInfo: Query<UserInfoGraphqlDocument>(),
	experience: Query<ExperienceGraphqlDocument>(),
	monument: Query<MonumentGraphqlDocument>(),
	placeDetail: Query<PlaceDetailGraphqlDocument>(),
	token: Query<TokenGraphqlDocument>(),
	monumentLike: Query<MonumentLikeGraphqlDocument>(),
	experienceLike: Query<ExperienceLikeGraphqlDocument>(),
} satisfies Record<CollectionName, any>

export default queries
