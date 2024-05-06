import { UserInfo } from './Account'
import { GraphqlDocument } from './Document'
import { TMonumentCompletion } from './MonumentCompletion'
import { MonumentLike, MonumentLikeGraphqlDocument } from './MonumentLike'
import { Monument } from './Monument'
import { Base64 } from './Others'
import { PlaceDetail } from './PlaceDetails'
import { Question } from './Question'
import { Tour } from './Tour'

export type MonumentCard = GraphqlDocument<Monument> & {
	placeDetail: PlaceDetail
	user: UserInfo
	likes: (MonumentLike & { user: UserInfo })[]
	totalLikesCount: number
	liked?: MonumentLikeGraphqlDocument | boolean | null | undefined
	question?: undefined | Question | null
	usersAnswerToQuestion?: { answeredCorrectly: boolean } | undefined | null
	monumentCompletions: GraphqlDocument<TMonumentCompletion>[]
}

export type TMonumentCardWithQuestion = Omit<MonumentCard, 'question'> & {
	question: Question
}

export type SmallMonumentCard = Omit<
	MonumentCard,
	'user' | 'likes' | 'liked' | 'question' | 'usersConnectedExperiences'
>

export type TTourCard = GraphqlDocument<
	Omit<Tour, 'monuments' | 'user'> & {
		initialTourPicture: string | Base64
		creator: UserInfo
	}
>

export const isMonumentWithQuestion = (
	monument: MonumentCard | TMonumentCardWithQuestion,
): monument is TMonumentCardWithQuestion => {
	return monument?.question ? true : false
}
