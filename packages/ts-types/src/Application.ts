import { UserInfo } from './Account'
import { GraphqlDocument } from './Document'
import { Experience, Monument } from './Experience'
import { ExperienceLike, MonumentLike } from './Likes'
import { PlaceDetail } from './PlaceDetails'

export type MonumentCard = GraphqlDocument<Monument> & {
	placeDetail: PlaceDetail
	creator: UserInfo
	likes: (MonumentLike & { user: UserInfo })[]
}

export type ExperienceCard = GraphqlDocument<Experience> & {
	placeDetail: PlaceDetail
	user: UserInfo
	likes: (ExperienceLike & { user: UserInfo })[]
}
