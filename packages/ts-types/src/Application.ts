import { UserInfo } from './Account'
import { GraphqlDocument } from './Document'
import { Experience } from './Experience'
import {
	ExperienceLike,
	ExperienceLikeGraphqlDocument,
	MonumentLike,
	MonumentLikeGraphqlDocument,
} from './Likes'
import { Monument } from './Monument'
import { PlaceDetail } from './PlaceDetails'

export type MonumentCard = GraphqlDocument<Monument> & {
	placeDetail: PlaceDetail
	user: UserInfo
	likes: (MonumentLike & { user: UserInfo })[]
	liked?: MonumentLikeGraphqlDocument | boolean | null | undefined
}

export type MonumentCardWithConnectedExperiences = MonumentCard & {
	connectedExperiences: GraphqlDocument<ExperienceCard>[]
}

export type ExperienceCard = GraphqlDocument<Experience> & {
	user: UserInfo
	likes: (ExperienceLike & { user: UserInfo })[]
	liked?: ExperienceLikeGraphqlDocument | null | undefined
}
