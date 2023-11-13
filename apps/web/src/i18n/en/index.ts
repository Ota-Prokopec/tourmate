import type { BaseTranslation } from '../i18n-types';

const en = {
	monuments: 'monuments',
	pictures: 'pictures',
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
	addThisLabel: 'add this label'
} satisfies BaseTranslation;

export default en;
