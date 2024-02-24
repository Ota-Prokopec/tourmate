import { Types } from '@app/appwrite-ssr-graphql'

import type {
	LocationForNotificationsGraphqlDocument,
	LocationForNotificationsDocumentCreate,
	ExperienceDocumentCreate,
	ExperienceGraphqlDocument,
	ExperienceLikeDocumentCreate,
	ExperienceLikeGraphqlDocument,
	MonumentDocumentCreate,
	MonumentGraphqlDocument,
	MonumentLikeDocumentCreate,
	MonumentLikeGraphqlDocument,
	NumberTypeAnswerDocumentCreate,
	NumberTypeAnswerGraphqlDocument,
	PlaceDetailDocumentCreate,
	PlaceDetailGraphqlDocument,
	QuestionDocumentCreate,
	QuestionGraphqlDocument,
	RadioTypeAnswerDocumentCreate,
	RadioTypeAnswerGraphqlDocument,
	TextTypeAnswerDocumentCreate,
	TextTypeAnswerGraphqlDocument,
	TokenDocumentCreate,
	TokenGraphqlDocument,
	UserInfoDocumentCreate,
	UserInfoGraphqlDocument,
	UsersAnswerDocumentCreate,
	UsersAnswerGraphqlDocument,
	TourGraphqlDocument,
	TourDocumentCreate,
} from '@app/ts-types'

export type Collections = ReturnType<typeof collectionsAdmin>
export type CollectionName = keyof ReturnType<typeof collectionsAdmin>

type AppwriteSSRReturnTypeClient = ReturnType<Types.AppwriteSSR['none']>
type AppwriteSSRReturnTypeAdmin = ReturnType<Types.AppwriteSSR['setAdmin']>

export const collectionsClient = (
	Collection: AppwriteSSRReturnTypeClient['Collection'],
) => {
	return {
		userInfo: new Collection<UserInfoGraphqlDocument, UserInfoDocumentCreate>(
			'experiences',
			'userInfo',
		),
		experience: new Collection<ExperienceGraphqlDocument, ExperienceDocumentCreate>(
			'experiences',
			'experiences',
		),
		monument: new Collection<MonumentGraphqlDocument, MonumentDocumentCreate>(
			'experiences',
			'monuments',
		),
		token: new Collection<TokenGraphqlDocument, TokenDocumentCreate>(
			'experiences',
			'tokens',
		),
		placeDetail: new Collection<PlaceDetailGraphqlDocument, PlaceDetailDocumentCreate>(
			'experiences',
			'placeDetails',
		),
		monumentLike: new Collection<MonumentLikeGraphqlDocument, MonumentLikeDocumentCreate>(
			'experiences',
			'monument-likes',
		),
		experienceLike: new Collection<
			ExperienceLikeGraphqlDocument,
			ExperienceLikeDocumentCreate
		>('experiences', 'experience-likes'),
		answerTypeText: new Collection<
			TextTypeAnswerGraphqlDocument,
			TextTypeAnswerDocumentCreate
		>('experiences', 'textAnswers'),
		answerTypeNumber: new Collection<
			NumberTypeAnswerGraphqlDocument,
			NumberTypeAnswerDocumentCreate
		>('experiences', 'numberAnswers'),
		answerTypeRadio: new Collection<
			RadioTypeAnswerGraphqlDocument,
			RadioTypeAnswerDocumentCreate
		>('experiences', 'radioAnswers'),

		question: new Collection<QuestionGraphqlDocument, QuestionDocumentCreate>(
			'experiences',
			'question',
		),
		usersAnswer: new Collection<UsersAnswerGraphqlDocument, UsersAnswerDocumentCreate>(
			'experiences',
			'usersAnswers',
		),
		locationForNotification: new Collection<
			LocationForNotificationsGraphqlDocument,
			LocationForNotificationsDocumentCreate
		>('experiences', 'locationForNotifications'),
		tour: new Collection<TourGraphqlDocument, TourDocumentCreate>('experiences', 'tours'),
	}
}

export const collectionsAdmin = (
	Collection: AppwriteSSRReturnTypeAdmin['Collection'],
) => {
	return {
		userInfo: new Collection<UserInfoGraphqlDocument, UserInfoDocumentCreate>(
			'experiences',
			'userInfo',
		),
		experience: new Collection<ExperienceGraphqlDocument, ExperienceDocumentCreate>(
			'experiences',
			'experiences',
		),
		monument: new Collection<MonumentGraphqlDocument, MonumentDocumentCreate>(
			'experiences',
			'monuments',
		),
		token: new Collection<TokenGraphqlDocument, TokenDocumentCreate>(
			'experiences',
			'tokens',
		),
		placeDetail: new Collection<PlaceDetailGraphqlDocument, PlaceDetailDocumentCreate>(
			'experiences',
			'placeDetails',
		),
		monumentLike: new Collection<MonumentLikeGraphqlDocument, MonumentLikeDocumentCreate>(
			'experiences',
			'monument-likes',
		),
		experienceLike: new Collection<
			ExperienceLikeGraphqlDocument,
			ExperienceLikeDocumentCreate
		>('experiences', 'experience-likes'),
		answerTypeText: new Collection<
			TextTypeAnswerGraphqlDocument,
			TextTypeAnswerDocumentCreate
		>('experiences', 'textAnswers'),
		answerTypeNumber: new Collection<
			NumberTypeAnswerGraphqlDocument,
			NumberTypeAnswerDocumentCreate
		>('experiences', 'numberAnswers'),
		answerTypeRadio: new Collection<
			RadioTypeAnswerGraphqlDocument,
			RadioTypeAnswerDocumentCreate
		>('experiences', 'radioAnswers'),
		question: new Collection<QuestionGraphqlDocument, QuestionDocumentCreate>(
			'experiences',
			'question',
		),
		usersAnswer: new Collection<UsersAnswerGraphqlDocument, UsersAnswerDocumentCreate>(
			'experiences',
			'usersAnswers',
		),
		locationForNotification: new Collection<
			LocationForNotificationsGraphqlDocument,
			LocationForNotificationsDocumentCreate
		>('experiences', 'locationForNotifications'),
		tour: new Collection<TourGraphqlDocument, TourDocumentCreate>('experiences', 'tours'),
	}
}
