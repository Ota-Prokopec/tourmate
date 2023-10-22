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
	creator: UserInfo
	likes: (MonumentLike & { user: UserInfo })[]
	liked?: MonumentLikeGraphqlDocument | null | undefined
}

export type ExperienceCard = GraphqlDocument<Experience> & {
	placeDetail: PlaceDetail
	user: UserInfo
	likes: (ExperienceLike & { user: UserInfo })[]
	liked?: ExperienceLikeGraphqlDocument | null | undefined
}
