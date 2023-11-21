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
import { AnswerType, Question } from './Question'

export type MonumentCard = GraphqlDocument<Monument> & {
	placeDetail: PlaceDetail
	user: UserInfo
	likes: (MonumentLike & { user: UserInfo })[]
	liked?: MonumentLikeGraphqlDocument | boolean | null | undefined
	question?: undefined | Question<AnswerType> | null
}

export type MonumentCardWithConnectedExperiences = MonumentCard & {
	connectedExperiences: GraphqlDocument<Omit<ExperienceCard, 'connectedMonument'>>[]
}

export type ExperienceCard = GraphqlDocument<Experience> & {
	user: UserInfo
	likes: (ExperienceLike & { user: UserInfo })[]
	liked?: ExperienceLikeGraphqlDocument | null | undefined
	connectedMonument: MonumentCard
}
