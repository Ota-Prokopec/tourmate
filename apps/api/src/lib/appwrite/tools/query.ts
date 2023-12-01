import { Query } from '@app/appwrite-ssr-graphql'
import { CollectionName } from './collections'

import type {
	Check,
	ExperienceDocument,
	ExperienceLikeDocument,
	MonumentDocument,
	MonumentLikeDocument,
	NumberTypeAnswerDocument,
	PlaceDetailDocument,
	QuestionDocument,
	RadioTypeAnswerDocument,
	TextTypeAnswerDocument,
	TokenDocument,
	UserInfoDocument,
	UsersAnswerDocument,
} from '@app/ts-types'

const query = {
	userInfo: Query<UserInfoDocument>(),
	experience: Query<ExperienceDocument>(),
	monument: Query<MonumentDocument>(),
	placeDetail: Query<PlaceDetailDocument>(),
	token: Query<TokenDocument>(),
	monumentLike: Query<MonumentLikeDocument>(),
	experienceLike: Query<ExperienceLikeDocument>(),
	answerTypeNumber: Query<NumberTypeAnswerDocument>(),
	answerTypeText: Query<TextTypeAnswerDocument>(),
	answerTypeRadio: Query<RadioTypeAnswerDocument>(),
	question: Query<QuestionDocument>(),
	usersAnswer: Query<UsersAnswerDocument>(),
} satisfies Record<CollectionName, any>

export type QueryType = (typeof query)[keyof typeof query]

export default query
