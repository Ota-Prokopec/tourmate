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
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​i​n​ ​u​p​d​a​t​i​n​g​ ​y​o​u​r​ ​p​r​o​f​i​l​e​.​ ​T​r​y​ ​t​o​ ​r​e​s​e​t​ ​t​h​e​ ​p​a​g​e​ ​a​n​d​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
	 */
	updateProfileErrorMessage: string
	/**
	 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​s​a​v​e​d
	 * @param {string} what
	 */
	saveErrorTitle: RequiredParams<'what'>
	/**
	 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​w​i​t​h​ ​s​a​v​i​n​g​ ​y​o​u​r​ ​{​t​y​p​e​}​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
	 * @param {string} type
	 */
	saveErrorMessage: RequiredParams<'type'>
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
	 * P​l​e​a​s​e​ ​u​s​e​r​n​a​m​e​ ​a​n​d​ ​u​s​e​r​ ​i​d​ ​h​a​s​ ​c​o​n​t​a​i​n​ ​a​t​ ​l​e​a​s​t​ ​4​ ​l​e​t​t​e​r​s
	 */
	registrationPageUsernameUserIdConditions: string
	/**
	 * a​c​c​e​p​t​ ​t​e​r​m​s​ ​a​n​d​ ​p​e​r​m​i​s​s​i​o​n​s
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
	 * We are sorry, but there was a problem in updating your profile. Try to reset the page and try it again.
	 */
	updateProfileErrorMessage: () => LocalizedString
	/**
	 * {what} was not saved
	 */
	saveErrorTitle: (arg: { what: string }) => LocalizedString
	/**
	 * We are sorry, but there was a problem with saving your {type}. Please try it again.
	 */
	saveErrorMessage: (arg: { type: string }) => LocalizedString
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
	 * Please username and user id has contain at least 4 letters
	 */
	registrationPageUsernameUserIdConditions: () => LocalizedString
	/**
	 * accept terms and permissions
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
}

export type Formatters = {}
