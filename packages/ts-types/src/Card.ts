import { UserInfo, UserInfoGraphqlDocument } from './Account'
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
	totalLikesCount: number
	liked?: MonumentLikeGraphqlDocument | boolean | null | undefined
	question?: undefined | Question | null
	usersAnswerToQuestion?: { answeredCorrectly: boolean } | undefined | null
	usersConnectedExperiences: GraphqlDocument<Experience>[]
}

export type SmallMonumentCard = Omit<
	MonumentCard,
	'user' | 'likes' | 'liked' | 'question' | 'usersConnectedExperiences'
>

export type MonumentCardWithConnectedExperiences = MonumentCard & {
	connectedExperiences: GraphqlDocument<Omit<ExperienceCard, 'connectedMonument'>>[]
}

export type ExperienceCard = GraphqlDocument<Experience> & {
	user: UserInfo
	likes: (ExperienceLike & { user: UserInfo })[]
	totalLikesCount?: number
	liked?: ExperienceLikeGraphqlDocument | null | undefined
	connectedMonument?: SmallMonumentCard | null | undefined
}
