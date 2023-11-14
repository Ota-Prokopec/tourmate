import type { BaseTranslation } from '../i18n-types';

const en = {
	monuments: 'monuments',
	pictures: 'pictures',
	monument: 'monument',
	experience: 'picture',
	places: 'místa',
	monumentsLoadErrorTitle: 'Monuments were not loaded',
	monumentsLoadErrorMessage:
		'We are sorry, but there was a problem in loading monuments on map. Try to reset the page.',
	updateProfilePictureErrorTitle: 'Profile picture was not updated',
	updateProfilePictureErrorMessage:
		'We are sorry, but there was a problem in updating your profile picture. Try to reset the page and try it again.',
	updateProfileErrorTitle: 'Profile was not updated',
	updateProfileErrorMessage:
		'We are sorry, but there was a problem in updating your profile. Try to reset the page and try it again.',

	saveErrorTitle: '{what: string} was not saved',
	saveErrorMessage:
		'We are sorry, but there was a problem with saving your {type: string}. Please try it again.',
	updateErrorTitle: '{what: string} was not updated',
	updateErrorMessage: '{what: string} was not updated, please try it again',
	deleteErrorTitle: '{what: string} was not deleted',
	deleteErrorMessage: '{what: string} was not deleted, please try it again',

	userName: 'user name',
	forgotenPassword: 'forgotten password',
	signUp: 'sign up',
	signUpVia: 'sign up via {via: string}',
	unsuccessfulLogin: 'login was not successful',
	unsuccessfulRegister: 'registration was not successful',
	regitrationPageTitle: 'Welcome into experinece app, we are happy to see you here.',
	registrationPageUsernameUserIdConditions:
		'Please username and user id has contain at least 4 letters',
	acceptTerms: 'accept terms and permissions',
	or: 'or',
	passwordsDontMatch: 'Your passwords dont match',
	userAlreadyExists: 'user already exists',
	takeYourFirstPicture: 'take your first picture',
	createYourFirstMonument: 'create your first monument',
	and: 'and',
	seeOnGoogleMaps: 'See on Google Maps',
	seeMore: 'see more',
	continue: 'next',
	toEditor: 'to editor',
	skipEditor: 'skip editor',
	locationNowFoundErrorTitle: 'Location not found',
	locationNowFoundErrorMessage:
		'We are sorry but your location could not be loaded. Please return back and try it again.',
	back: 'back',
	addThisLabel: 'add this label',
	deleteMonumentErrorTitle: 'Removing monument was not successful',
	deleteMonumentErrorMessage:
		'We are sorry, but there was an error in deleting your monument. Please try it again or contact us.',
	reallyDeleteYour_Question:
		'Do you really want to delete {what: string}, there is no way to get it back.',
	likeErrorTitle: 'Your like was not recorded',
	likeErrorMessage:
		'We are sorry, but there was a problem with liking. Please try to reload aplication.',
	removeLikeErrorTitle: 'Your like was not deleted',
	removeLikeErrorMessage:
		'We are sorry, but there was a problem with deleting your like. Please try to reload aplication.',
	seeOnMap: 'see on map'
} satisfies BaseTranslation;

export default en;
