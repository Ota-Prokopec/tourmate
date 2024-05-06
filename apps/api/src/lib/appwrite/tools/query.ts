import { Query } from '@app/appwrite-ssr-graphql'
import { CollectionName } from './collections'

import type {
	LocationForNotificationsDocument,
	MonumentDocument,
	MonumentLikeDocument,
	NumberTypeAnswerDocument,
	PlaceDetailDocument,
	QuestionDocument,
	RadioTypeAnswerDocument,
	TMonumentCompletionDocument,
	TTourCheckpointCompletionDocument,
	TextTypeAnswerDocument,
	TokenDocument,
	TourDocument,
	UserInfoDocument,
	UsersAnswerDocument,
} from '@app/ts-types'

const query = {
	userInfo: Query<UserInfoDocument>(),
	monumentCompletion: Query<TMonumentCompletionDocument>(),
	monument: Query<MonumentDocument>(),
	placeDetail: Query<PlaceDetailDocument>(),
	token: Query<TokenDocument>(),
	monumentLike: Query<MonumentLikeDocument>(),
	answerTypeNumber: Query<NumberTypeAnswerDocument>(),
	answerTypeText: Query<TextTypeAnswerDocument>(),
	answerTypeRadio: Query<RadioTypeAnswerDocument>(),
	question: Query<QuestionDocument>(),
	usersAnswer: Query<UsersAnswerDocument>(),
	locationForNotification: Query<LocationForNotificationsDocument>(),
	tour: Query<TourDocument>(),
	tourCheckpointCompletion: Query<TTourCheckpointCompletionDocument>(),
} satisfies Record<CollectionName, any>

export type QueryType = (typeof query)[keyof typeof query]

export default query
