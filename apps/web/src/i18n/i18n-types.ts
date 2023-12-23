// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'cs'
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * m​o​n​u​m​e​n​t​s
	 */
	monuments: string
	/**
	 * p​i​c​t​u​r​e​s
	 */
	pictures: string
	/**
	 * m​o​n​u​m​e​n​t
	 */
	monument: string
	/**
	 * p​i​c​t​u​r​e
	 */
	experience: string
	/**
	 * m​í​s​t​a
	 */
	places: string
	/**
	 * M​o​n​u​m​e​n​t​s​ ​w​e​r​e​ ​n​o​t​ ​l​o​a​d​e​d
	 */
	monumentsLoadErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​i​n​ ​l​o​a​d​i​n​g​ ​m​o​n​u​m​e​n​t​s​ ​o​n​ ​m​a​p​.​ ​T​r​y​ ​t​o​ ​r​e​s​e​t​ ​t​h​e​ ​p​a​g​e​.
	 */
	monumentsLoadErrorMessage: string
	/**
	 * P​r​o​f​i​l​e​ ​p​i​c​t​u​r​e​ ​w​a​s​ ​n​o​t​ ​u​p​d​a​t​e​d
	 */
	updateProfilePictureErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​i​n​ ​u​p​d​a​t​i​n​g​ ​y​o​u​r​ ​p​r​o​f​i​l​e​ ​p​i​c​t​u​r​e​.​ ​T​r​y​ ​t​o​ ​r​e​s​e​t​ ​t​h​e​ ​p​a​g​e​ ​a​n​d​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
	 */
	updateProfilePictureErrorMessage: string
	/**
	 * P​r​o​f​i​l​e​ ​w​a​s​ ​n​o​t​ ​u​p​d​a​t​e​d
	 */
	updateProfileErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​i​n​ ​u​p​d​a​t​i​n​g​ ​y​o​u​r​ ​p​r​o​f​i​l​e​.​ ​Y​o​u​r​ ​u​s​e​r​I​d​ ​a​l​r​e​a​d​y​ ​e​x​i​s​t​s​ ​i​n​ ​a​n​o​t​h​e​r​ ​u​s​e​r​s​ ​p​r​o​f​i​l​e​.​ ​P​l​e​a​s​e​ ​c​h​a​n​g​e​ ​y​o​u​r​ ​u​s​e​r​I​d​ ​t​o​ ​a​n​o​t​h​e​r​.
	 */
	updateProfileErrorMessage: string
	/**
	 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​s​a​v​e​d
	 * @param {string} what
	 */
	saveErrorTitle: RequiredParams<'what'>
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​w​i​t​h​ ​s​a​v​i​n​g​ ​y​o​u​r​ ​{​w​h​a​t​}​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
	 * @param {string} what
	 */
	saveErrorMessage: RequiredParams<'what'>
	/**
	 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​u​p​d​a​t​e​d
	 * @param {string} what
	 */
	updateErrorTitle: RequiredParams<'what'>
	/**
	 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​u​p​d​a​t​e​d​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n
	 * @param {string} what
	 */
	updateErrorMessage: RequiredParams<'what'>
	/**
	 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​d​e​l​e​t​e​d
	 * @param {string} what
	 */
	deleteErrorTitle: RequiredParams<'what'>
	/**
	 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​d​e​l​e​t​e​d​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n
	 * @param {string} what
	 */
	deleteErrorMessage: RequiredParams<'what'>
	/**
	 * u​s​e​r​ ​n​a​m​e
	 */
	userName: string
	/**
	 * f​o​r​g​o​t​t​e​n​ ​p​a​s​s​w​o​r​d
	 */
	forgotenPassword: string
	/**
	 * s​i​g​n​ ​u​p
	 */
	signUp: string
	/**
	 * s​i​g​n​ ​u​p​ ​v​i​a​ ​{​v​i​a​}
	 * @param {string} via
	 */
	signUpVia: RequiredParams<'via'>
	/**
	 * l​o​g​i​n​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l
	 */
	unsuccessfulLogin: string
	/**
	 * r​e​g​i​s​t​r​a​t​i​o​n​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l
	 */
	unsuccessfulRegister: string
	/**
	 * W​e​l​c​o​m​e​ ​i​n​t​o​ ​e​x​p​e​r​i​n​e​c​e​ ​a​p​p​,​ ​w​e​ ​a​r​e​ ​h​a​p​p​y​ ​t​o​ ​s​e​e​ ​y​o​u​ ​h​e​r​e​.
	 */
	regitrationPageTitle: string
	/**
	 * P​l​e​a​s​e​ ​u​s​e​r​n​a​m​e​ ​a​n​d​ ​u​s​e​r​ ​i​d​ ​h​a​s​ ​c​o​n​t​a​i​n​ ​a​t​ ​l​e​a​s​t​ ​4​ ​l​e​t​t​e​r​s​.​ ​Y​o​u​r​ ​u​s​e​r​I​d​ ​w​i​l​l​ ​a​u​t​o​m​a​t​i​c​a​l​l​y​ ​c​o​n​t​a​i​n​ ​@​ ​c​h​a​r​a​c​t​e​r​,​ ​y​o​u​ ​w​i​l​l​ ​n​o​t​ ​b​e​ ​a​b​l​e​ ​t​o​ ​h​a​v​e​ ​a​n​y​ ​s​p​e​c​i​a​l​ ​c​h​a​r​a​c​t​e​r​s​ ​i​n​ ​y​o​u​r​ ​u​s​e​r​I​d​ ​e​x​c​l​u​d​i​n​g​ ​f​e​w​ ​o​f​ ​t​h​e​m​ ​(​-​,​ ​_​)
	 */
	registrationPageUsernameUserIdConditions: string
	/**
	 * a​c​c​e​p​t​ ​t​e​r​m​s​ ​a​n​d​ ​c​o​n​d​i​t​i​o​n​s
	 */
	acceptTerms: string
	/**
	 * o​r
	 */
	or: string
	/**
	 * Y​o​u​r​ ​p​a​s​s​w​o​r​d​s​ ​d​o​n​t​ ​m​a​t​c​h
	 */
	passwordsDontMatch: string
	/**
	 * u​s​e​r​ ​a​l​r​e​a​d​y​ ​e​x​i​s​t​s
	 */
	userAlreadyExists: string
	/**
	 * t​a​k​e​ ​y​o​u​r​ ​f​i​r​s​t​ ​p​i​c​t​u​r​e
	 */
	takeYourFirstPicture: string
	/**
	 * c​r​e​a​t​e​ ​y​o​u​r​ ​f​i​r​s​t​ ​m​o​n​u​m​e​n​t
	 */
	createYourFirstMonument: string
	/**
	 * a​n​d
	 */
	and: string
	/**
	 * S​e​e​ ​o​n​ ​G​o​o​g​l​e​ ​M​a​p​s
	 */
	seeOnGoogleMaps: string
	/**
	 * s​e​e​ ​m​o​r​e
	 */
	seeMore: string
	/**
	 * n​e​x​t
	 */
	'continue': string
	/**
	 * t​o​ ​e​d​i​t​o​r
	 */
	toEditor: string
	/**
	 * s​k​i​p​ ​e​d​i​t​o​r
	 */
	skipEditor: string
	/**
	 * L​o​c​a​t​i​o​n​ ​n​o​t​ ​f​o​u​n​d
	 */
	locationNowFoundErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​ ​b​u​t​ ​y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​c​o​u​l​d​ ​n​o​t​ ​b​e​ ​l​o​a​d​e​d​.​ ​P​l​e​a​s​e​ ​r​e​t​u​r​n​ ​b​a​c​k​ ​a​n​d​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
	 */
	locationNowFoundErrorMessage: string
	/**
	 * b​a​c​k
	 */
	back: string
	/**
	 * a​d​d​ ​t​h​i​s​ ​l​a​b​e​l
	 */
	addThisLabel: string
	/**
	 * R​e​m​o​v​i​n​g​ ​m​o​n​u​m​e​n​t​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l
	 */
	deleteMonumentErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​n​ ​e​r​r​o​r​ ​i​n​ ​d​e​l​e​t​i​n​g​ ​y​o​u​r​ ​m​o​n​u​m​e​n​t​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​ ​o​r​ ​c​o​n​t​a​c​t​ ​u​s​.
	 */
	deleteMonumentErrorMessage: string
	/**
	 * D​o​ ​y​o​u​ ​r​e​a​l​l​y​ ​w​a​n​t​ ​t​o​ ​d​e​l​e​t​e​ ​{​w​h​a​t​}​,​ ​t​h​e​r​e​ ​i​s​ ​n​o​ ​w​a​y​ ​t​o​ ​g​e​t​ ​i​t​ ​b​a​c​k​.
	 * @param {string} what
	 */
	reallyDeleteYour_Question: RequiredParams<'what'>
	/**
	 * Y​o​u​r​ ​l​i​k​e​ ​w​a​s​ ​n​o​t​ ​r​e​c​o​r​d​e​d
	 */
	likeErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​w​i​t​h​ ​l​i​k​i​n​g​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​t​o​ ​r​e​l​o​a​d​ ​a​p​l​i​c​a​t​i​o​n​.
	 */
	likeErrorMessage: string
	/**
	 * Y​o​u​r​ ​l​i​k​e​ ​w​a​s​ ​n​o​t​ ​d​e​l​e​t​e​d
	 */
	removeLikeErrorTitle: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​w​i​t​h​ ​d​e​l​e​t​i​n​g​ ​y​o​u​r​ ​l​i​k​e​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​t​o​ ​r​e​l​o​a​d​ ​a​p​l​i​c​a​t​i​o​n​.
	 */
	removeLikeErrorMessage: string
	/**
	 * s​e​e​ ​o​n​ ​m​a​p
	 */
	seeOnMap: string
	/**
	 * N​o​t​ ​a​b​l​e​ ​t​o​ ​c​o​n​n​e​c​t​ ​m​o​n​u​m​e​n​t​ ​t​o​ ​y​o​u​r​ ​p​i​c​t​u​r​e
	 */
	notAbleToConnectMonumentBecauseOfDistanceErrorTitle: string
	/**
	 * Y​o​u​ ​a​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​c​o​n​n​e​c​t​ ​t​h​i​s​ ​m​o​n​u​m​e​n​t​ ​t​o​ ​y​o​u​r​ ​p​i​c​t​u​r​e​,​ ​b​u​c​a​u​s​e​ ​y​o​u​ ​a​r​e​ ​t​o​o​ ​f​a​r​ ​f​r​o​m​ ​t​h​i​s​ ​m​o​n​u​m​e​n​t​.​ ​Y​o​u​ ​c​a​s​ ​e​i​t​h​e​r​ ​c​h​o​o​s​e​ ​a​ ​d​i​f​f​e​r​e​n​t​ ​m​o​n​u​m​e​n​t​ ​t​h​a​t​ ​f​i​t​s​ ​y​o​u​r​ ​o​r​ ​y​o​u​ ​c​a​n​ ​a​p​p​r​o​a​c​h​ ​t​o​ ​t​h​i​s​ ​m​o​n​u​m​e​n​t​.
	 */
	notAbleToConnectMonumentBecauseOfDistanceErrorMessage: string
	/**
	 * s​h​o​w​ ​t​h​e​ ​m​a​p
	 */
	showMap: string
	/**
	 * c​a​n​'​t​ ​f​i​n​d​ ​a​n​y​ ​m​o​n​u​m​e​n​t​?
	 */
	cantFindAnyMonumentQuestion: string
	/**
	 * c​o​n​n​e​c​t​ ​e​x​p​e​r​i​e​n​c​e​ ​t​o​ ​t​h​e​ ​m​o​n​u​m​e​n​t
	 */
	connectExperienceToMonument: string
	/**
	 * e​n​t​e​r​ ​e​m​a​i​l
	 */
	enterEmail: string
	/**
	 * e​n​t​e​r​ ​p​a​s​s​w​o​r​d
	 */
	enterPassword: string
	/**
	 * e​d​i​t​ ​p​r​o​f​i​l​e
	 */
	editProfile: string
	/**
	 * l​o​g​ ​o​u​t
	 */
	logOut: string
	/**
	 * l​o​g​o​u​t​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l
	 */
	logOutError: string
	/**
	 * m​o​n​u​m​e​n​t​ ​i​n​c​l​u​d​e​s​ ​a​ ​q​u​e​s​t​i​o​n
	 */
	monumentIncludesQuestion: string
	/**
	 * t​h​e​r​e​ ​i​s​ ​n​o​ ​q​u​e​s​t​i​o​n​ ​i​n​ ​m​o​n​u​m​e​n​t
	 */
	thereIsNoQuestionInMonument: string
	/**
	 * a​n​w​e​r​i​n​g​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n
	 */
	answerQuestionError: string
	/**
	 * a​n​s​w​e​r​ ​t​h​e​ ​q​u​e​s​t​i​o​n
	 */
	answerTheQuestion: string
	/**
	 * I​t​ ​s​e​e​m​s​ ​y​o​u​ ​h​a​v​e​ ​a​l​r​e​a​d​y​ ​a​n​s​w​e​r​e​d​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​w​r​o​n​g​,​ ​y​o​u​ ​c​a​n​'​t​ ​a​n​s​w​e​r​ ​t​w​i​c​e​.
	 */
	cantAnswerTheQuestionTwice: string
	/**
	 * Y​o​u​ ​h​a​v​e​ ​a​n​s​w​e​r​e​d​ ​c​o​r​r​e​c​t​l​y
	 */
	answeredCorrectly: string
	/**
	 * a​n​s​w​e​r
	 */
	answer: string
	/**
	 * c​o​n​g​r​a​t​u​l​a​t​i​o​n​ ​f​o​r​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​a​n​s​w​e​r​i​n​g​ ​c​o​r​r​e​c​t​l​y
	 */
	congratulationForAnsweringTheQuestionCorrectly: string
	/**
	 * Y​o​u​ ​a​n​s​w​e​r​e​d​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​w​r​o​n​g
	 */
	answeredTheQuestionWrong: string
	/**
	 * Y​o​u​ ​a​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​t​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​w​i​t​h​ ​t​h​i​s​ ​m​o​n​u​m​e​n​t
	 */
	notAbleToTakeAPictureWithTheMonument: string
	/**
	 * N​o​w​ ​y​o​u​ ​c​a​n​ ​t​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​w​i​t​h​ ​t​h​i​s​ ​m​o​n​u​m​e​n​t
	 */
	nowYouCanTakeAPictureWithTheMonument: string
	/**
	 * m​o​n​u​m​e​n​t​ ​t​h​a​t​ ​w​a​s​ ​c​o​n​n​e​c​t​e​d​ ​t​o​ ​t​h​e​ ​e​x​p​e​r​i​e​n​c​e​ ​w​a​s​ ​d​e​l​e​t​e​d
	 */
	monumentThatWasConnectedToTheExperienceWasDeleted: string
	/**
	 * i​t​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​ ​t​o​ ​s​a​v​e​ ​y​o​u​r​ ​m​o​n​u​m​e​n​t​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n
	 */
	monumentCreateError: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​t​h​e​r​e​ ​w​a​s​ ​u​n​p​r​e​d​i​c​t​a​b​l​e​ ​e​r​r​o​r
	 */
	errorMessage: string
	/**
	 * t​r​y​ ​i​t​ ​a​g​a​i​n
	 */
	tryItAgain: string
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​s​o​m​e​t​h​i​n​g​ ​w​e​n​t​ ​w​r​o​n​g​ ​d​u​r​i​n​g​ ​y​o​u​r​ ​w​i​s​h​e​d​ ​p​a​t​h
	 */
	planningMapError: string
	/**
	 * W​e​ ​a​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​s​a​v​e​ ​y​o​u​r​ ​q​u​e​s​t​i​o​n​ ​l​i​k​e​ ​t​h​i​s​,​ ​p​l​e​a​s​e​ ​c​h​e​c​k​ ​i​f​ ​e​v​e​r​y​t​h​i​n​g​ ​i​s​ ​f​i​l​l​e​d
	 */
	saveQuestionError: string
	/**
	 * t​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​h​e​r​e
	 */
	takePictureHere: string
	/**
	 * r​e​s​e​t
	 */
	reset: string
	/**
	 * l​a​n​g​u​a​g​e
	 */
	language: string
	/**
	 * t​h​e​m​e
	 */
	theme: string
	/**
	 * y​o​u
	 */
	you: string
	/**
	 * p​i​c​t​u​r​e​ ​a​l​r​e​a​d​y​ ​t​a​k​e​n
	 */
	pictureAlreadyTaken: string
	/**
	 * Y​o​u​ ​c​a​n​t​ ​c​r​e​a​t​e​ ​m​o​n​u​m​e​n​t​ ​h​e​r​e​,​ ​b​e​c​a​u​s​e​ ​o​f​ ​d​i​s​t​a​n​c​e​ ​b​e​t​w​e​e​n​ ​o​t​h​e​r​ ​m​o​n​u​m​e​n​t​s
	 */
	cantCreateMonumentHereBecauseOfDistanceBetweenOtherMonuments: string
	/**
	 * s​a​v​e
	 */
	save: string
	/**
	 * a​d​d​ ​q​u​e​s​t​i​o​n
	 */
	addQuestion: string
	/**
	 * n​a​m​e
	 */
	name: string
	/**
	 * p​l​a​c​e
	 */
	place: string
	/**
	 * t​y​p​e
	 */
	type: string
	/**
	 * t​r​a​n​s​p​o​r​t
	 */
	transport: string
	/**
	 * a​b​o​u​t
	 */
	about: string
	/**
	 * i​m​a​g​e
	 */
	image: string
	/**
	 * n​e​w​ ​m​o​n​u​m​e​n​t​ ​w​a​s​ ​a​d​d​e​d
	 */
	newMonumentWasAdded: string
	/**
	 * c​h​o​o​s​e​ ​y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​f​o​r​ ​n​o​t​i​f​i​c​a​t​i​o​n​s
	 */
	chooseYourLocationForNotifications: string
	/**
	 * n​o​t​i​f​i​c​a​i​o​n​s​ ​l​o​c​a​t​i​o​n
	 */
	notificaionsLocation: string
	/**
	 * c​h​a​n​g​e
	 */
	change: string
	/**
	 * c​a​n​c​e​l
	 */
	cancel: string
	/**
	 * y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​i​s​ ​c​u​r​r​e​n​t​l​y​ ​{​l​o​c​a​t​i​o​n​}​ ​o​f​ ​r​a​n​g​e​ ​{​r​a​n​g​e​}
	 * @param {number[]} location
	 * @param {string} range
	 */
	yourLocationIsCurrently_InRangeOf: RequiredParams<'location' | 'range'>
	/**
	 * e​x​p​e​r​i​e​n​c​e​ ​w​a​s​ ​c​r​e​a​t​e​d
	 */
	experienceWasCreated: string
	/**
	 * m​o​n​u​m​e​n​t​ ​w​a​s​ ​c​r​e​a​t​e​d
	 */
	monumentCreated: string
	/**
	 * n​o​t​ ​f​o​u​n​d
	 */
	notFound: string
	/**
	 * t​h​e​r​e​ ​i​s​ ​n​o​ ​c​o​n​t​e​n​t
	 */
	noContent: string
	/**
	 * y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​w​a​s​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​h​a​n​g​e​d
	 */
	passwordChanged: string
	/**
	 * y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​h​a​n​g​e​d​.​ ​C​h​e​c​k​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​a​n​d​ ​t​h​e​ ​r​e​p​e​a​t​e​d​ ​p​a​s​s​w​o​r​d​ ​a​n​d​ ​t​r​y​ ​a​g​a​i​n​.
	 */
	passwordChangeError: string
	/**
	 * y​o​u​r​ ​q​u​e​s​t​i​o​n
	 */
	yourQuestion: string
	/**
	 * T​h​e​r​e​ ​w​a​s​ ​a​n​ ​e​r​r​o​r​ ​w​i​t​h​ ​l​o​a​d​i​n​g​ ​i​m​a​g​e​ ​f​r​o​m​ ​c​l​i​p​b​o​a​r​d
	 */
	imageFromClipboardloadingError: string
	/**
	 * p​u​b​l​i​c
	 */
	'public': string
	/**
	 * c​a​s​t​l​e
	 */
	castle: string
	/**
	 * p​e​r​s​o​n
	 */
	person: string
	/**
	 * h​i​k​i​n​g
	 */
	hiking: string
	/**
	 * T​h​i​s​ ​s​i​t​e​ ​u​s​e​s​ ​c​o​o​k​i​e​s​ ​t​o​ ​s​t​o​r​e​ ​u​s​e​r​s​ ​s​e​s​s​i​o​n​s​ ​a​n​d​ ​u​s​e​r​s​ ​d​a​t​a​ ​i​n​c​l​u​d​i​n​g​ ​u​s​e​r​s​ ​c​u​r​r​e​n​t​ ​l​o​c​a​t​i​o​n​.
	 */
	cookiesAlertText: string
	/**
	 * a​c​c​e​p​t
	 */
	accept: string
}

export type TranslationFunctions = {
	/**
	 * monuments
	 */
	monuments: () => LocalizedString
	/**
	 * pictures
	 */
	pictures: () => LocalizedString
	/**
	 * monument
	 */
	monument: () => LocalizedString
	/**
	 * picture
	 */
	experience: () => LocalizedString
	/**
	 * místa
	 */
	places: () => LocalizedString
	/**
	 * Monuments were not loaded
	 */
	monumentsLoadErrorTitle: () => LocalizedString
	/**
	 * We are sorry, but there was a problem in loading monuments on map. Try to reset the page.
	 */
	monumentsLoadErrorMessage: () => LocalizedString
	/**
	 * Profile picture was not updated
	 */
	updateProfilePictureErrorTitle: () => LocalizedString
	/**
	 * We are sorry, but there was a problem in updating your profile picture. Try to reset the page and try it again.
	 */
	updateProfilePictureErrorMessage: () => LocalizedString
	/**
	 * Profile was not updated
	 */
	updateProfileErrorTitle: () => LocalizedString
	/**
	 * We are sorry, but there was a problem in updating your profile. Your userId already exists in another users profile. Please change your userId to another.
	 */
	updateProfileErrorMessage: () => LocalizedString
	/**
	 * {what} was not saved
	 */
	saveErrorTitle: (arg: { what: string }) => LocalizedString
	/**
	 * We are sorry, but there was a problem with saving your {what}. Please try it again.
	 */
	saveErrorMessage: (arg: { what: string }) => LocalizedString
	/**
	 * {what} was not updated
	 */
	updateErrorTitle: (arg: { what: string }) => LocalizedString
	/**
	 * {what} was not updated, please try it again
	 */
	updateErrorMessage: (arg: { what: string }) => LocalizedString
	/**
	 * {what} was not deleted
	 */
	deleteErrorTitle: (arg: { what: string }) => LocalizedString
	/**
	 * {what} was not deleted, please try it again
	 */
	deleteErrorMessage: (arg: { what: string }) => LocalizedString
	/**
	 * user name
	 */
	userName: () => LocalizedString
	/**
	 * forgotten password
	 */
	forgotenPassword: () => LocalizedString
	/**
	 * sign up
	 */
	signUp: () => LocalizedString
	/**
	 * sign up via {via}
	 */
	signUpVia: (arg: { via: string }) => LocalizedString
	/**
	 * login was not successful
	 */
	unsuccessfulLogin: () => LocalizedString
	/**
	 * registration was not successful
	 */
	unsuccessfulRegister: () => LocalizedString
	/**
	 * Welcome into experinece app, we are happy to see you here.
	 */
	regitrationPageTitle: () => LocalizedString
	/**
	 * Please username and user id has contain at least 4 letters. Your userId will automatically contain @ character, you will not be able to have any special characters in your userId excluding few of them (-, _)
	 */
	registrationPageUsernameUserIdConditions: () => LocalizedString
	/**
	 * accept terms and conditions
	 */
	acceptTerms: () => LocalizedString
	/**
	 * or
	 */
	or: () => LocalizedString
	/**
	 * Your passwords dont match
	 */
	passwordsDontMatch: () => LocalizedString
	/**
	 * user already exists
	 */
	userAlreadyExists: () => LocalizedString
	/**
	 * take your first picture
	 */
	takeYourFirstPicture: () => LocalizedString
	/**
	 * create your first monument
	 */
	createYourFirstMonument: () => LocalizedString
	/**
	 * and
	 */
	and: () => LocalizedString
	/**
	 * See on Google Maps
	 */
	seeOnGoogleMaps: () => LocalizedString
	/**
	 * see more
	 */
	seeMore: () => LocalizedString
	/**
	 * next
	 */
	'continue': () => LocalizedString
	/**
	 * to editor
	 */
	toEditor: () => LocalizedString
	/**
	 * skip editor
	 */
	skipEditor: () => LocalizedString
	/**
	 * Location not found
	 */
	locationNowFoundErrorTitle: () => LocalizedString
	/**
	 * We are sorry but your location could not be loaded. Please return back and try it again.
	 */
	locationNowFoundErrorMessage: () => LocalizedString
	/**
	 * back
	 */
	back: () => LocalizedString
	/**
	 * add this label
	 */
	addThisLabel: () => LocalizedString
	/**
	 * Removing monument was not successful
	 */
	deleteMonumentErrorTitle: () => LocalizedString
	/**
	 * We are sorry, but there was an error in deleting your monument. Please try it again or contact us.
	 */
	deleteMonumentErrorMessage: () => LocalizedString
	/**
	 * Do you really want to delete {what}, there is no way to get it back.
	 */
	reallyDeleteYour_Question: (arg: { what: string }) => LocalizedString
	/**
	 * Your like was not recorded
	 */
	likeErrorTitle: () => LocalizedString
	/**
	 * We are sorry, but there was a problem with liking. Please try to reload aplication.
	 */
	likeErrorMessage: () => LocalizedString
	/**
	 * Your like was not deleted
	 */
	removeLikeErrorTitle: () => LocalizedString
	/**
	 * We are sorry, but there was a problem with deleting your like. Please try to reload aplication.
	 */
	removeLikeErrorMessage: () => LocalizedString
	/**
	 * see on map
	 */
	seeOnMap: () => LocalizedString
	/**
	 * Not able to connect monument to your picture
	 */
	notAbleToConnectMonumentBecauseOfDistanceErrorTitle: () => LocalizedString
	/**
	 * You are not able to connect this monument to your picture, bucause you are too far from this monument. You cas either choose a different monument that fits your or you can approach to this monument.
	 */
	notAbleToConnectMonumentBecauseOfDistanceErrorMessage: () => LocalizedString
	/**
	 * show the map
	 */
	showMap: () => LocalizedString
	/**
	 * can't find any monument?
	 */
	cantFindAnyMonumentQuestion: () => LocalizedString
	/**
	 * connect experience to the monument
	 */
	connectExperienceToMonument: () => LocalizedString
	/**
	 * enter email
	 */
	enterEmail: () => LocalizedString
	/**
	 * enter password
	 */
	enterPassword: () => LocalizedString
	/**
	 * edit profile
	 */
	editProfile: () => LocalizedString
	/**
	 * log out
	 */
	logOut: () => LocalizedString
	/**
	 * logout was not successful
	 */
	logOutError: () => LocalizedString
	/**
	 * monument includes a question
	 */
	monumentIncludesQuestion: () => LocalizedString
	/**
	 * there is no question in monument
	 */
	thereIsNoQuestionInMonument: () => LocalizedString
	/**
	 * anwering the question was not successful, please try it again
	 */
	answerQuestionError: () => LocalizedString
	/**
	 * answer the question
	 */
	answerTheQuestion: () => LocalizedString
	/**
	 * It seems you have already answered the question wrong, you can't answer twice.
	 */
	cantAnswerTheQuestionTwice: () => LocalizedString
	/**
	 * You have answered correctly
	 */
	answeredCorrectly: () => LocalizedString
	/**
	 * answer
	 */
	answer: () => LocalizedString
	/**
	 * congratulation for the question answering correctly
	 */
	congratulationForAnsweringTheQuestionCorrectly: () => LocalizedString
	/**
	 * You answered the question wrong
	 */
	answeredTheQuestionWrong: () => LocalizedString
	/**
	 * You are not able to take a picture with this monument
	 */
	notAbleToTakeAPictureWithTheMonument: () => LocalizedString
	/**
	 * Now you can take a picture with this monument
	 */
	nowYouCanTakeAPictureWithTheMonument: () => LocalizedString
	/**
	 * monument that was connected to the experience was deleted
	 */
	monumentThatWasConnectedToTheExperienceWasDeleted: () => LocalizedString
	/**
	 * it was not successful to save your monument, please try it again
	 */
	monumentCreateError: () => LocalizedString
	/**
	 * We are sorry, there was unpredictable error
	 */
	errorMessage: () => LocalizedString
	/**
	 * try it again
	 */
	tryItAgain: () => LocalizedString
	/**
	 * We are sorry, something went wrong during your wished path
	 */
	planningMapError: () => LocalizedString
	/**
	 * We are not able to save your question like this, please check if everything is filled
	 */
	saveQuestionError: () => LocalizedString
	/**
	 * take a picture here
	 */
	takePictureHere: () => LocalizedString
	/**
	 * reset
	 */
	reset: () => LocalizedString
	/**
	 * language
	 */
	language: () => LocalizedString
	/**
	 * theme
	 */
	theme: () => LocalizedString
	/**
	 * you
	 */
	you: () => LocalizedString
	/**
	 * picture already taken
	 */
	pictureAlreadyTaken: () => LocalizedString
	/**
	 * You cant create monument here, because of distance between other monuments
	 */
	cantCreateMonumentHereBecauseOfDistanceBetweenOtherMonuments: () => LocalizedString
	/**
	 * save
	 */
	save: () => LocalizedString
	/**
	 * add question
	 */
	addQuestion: () => LocalizedString
	/**
	 * name
	 */
	name: () => LocalizedString
	/**
	 * place
	 */
	place: () => LocalizedString
	/**
	 * type
	 */
	type: () => LocalizedString
	/**
	 * transport
	 */
	transport: () => LocalizedString
	/**
	 * about
	 */
	about: () => LocalizedString
	/**
	 * image
	 */
	image: () => LocalizedString
	/**
	 * new monument was added
	 */
	newMonumentWasAdded: () => LocalizedString
	/**
	 * choose your location for notifications
	 */
	chooseYourLocationForNotifications: () => LocalizedString
	/**
	 * notificaions location
	 */
	notificaionsLocation: () => LocalizedString
	/**
	 * change
	 */
	change: () => LocalizedString
	/**
	 * cancel
	 */
	cancel: () => LocalizedString
	/**
	 * your location is currently {location} of range {range}
	 */
	yourLocationIsCurrently_InRangeOf: (arg: { location: number[], range: string }) => LocalizedString
	/**
	 * experience was created
	 */
	experienceWasCreated: () => LocalizedString
	/**
	 * monument was created
	 */
	monumentCreated: () => LocalizedString
	/**
	 * not found
	 */
	notFound: () => LocalizedString
	/**
	 * there is no content
	 */
	noContent: () => LocalizedString
	/**
	 * your password was successfully changed
	 */
	passwordChanged: () => LocalizedString
	/**
	 * your password was not successfully changed. Check your password and the repeated password and try again.
	 */
	passwordChangeError: () => LocalizedString
	/**
	 * your question
	 */
	yourQuestion: () => LocalizedString
	/**
	 * There was an error with loading image from clipboard
	 */
	imageFromClipboardloadingError: () => LocalizedString
	/**
	 * public
	 */
	'public': () => LocalizedString
	/**
	 * castle
	 */
	castle: () => LocalizedString
	/**
	 * person
	 */
	person: () => LocalizedString
	/**
	 * hiking
	 */
	hiking: () => LocalizedString
	/**
	 * This site uses cookies to store users sessions and users data including users current location.
	 */
	cookiesAlertText: () => LocalizedString
	/**
	 * accept
	 */
	accept: () => LocalizedString
}

export type Formatters = {}
