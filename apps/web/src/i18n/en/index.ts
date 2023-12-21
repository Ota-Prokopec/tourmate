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
		'We are sorry, but there was a problem with saving your {what: string}. Please try it again.',
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
	seeOnMap: 'see on map',
	notAbleToConnectMonumentBecauseOfDistanceErrorTitle:
		'Not able to connect monument to your picture',
	notAbleToConnectMonumentBecauseOfDistanceErrorMessage:
		'You are not able to connect this monument to your picture, bucause you are too far from this monument. You cas either choose a different monument that fits your or you can approach to this monument.',
	showMap: 'show the map',
	cantFindAnyMonumentQuestion: "can't find any monument?",
	connectExperienceToMonument: 'connect experience to the monument',
	enterEmail: 'enter email',
	enterPassword: 'enter password',
	editProfile: 'edit profile',
	logOut: 'log out',
	logOutError: 'logout was not successful',
	monumentIncludesQuestion: 'monument includes a question',
	thereIsNoQuestionInMonument: 'there is no question in monument',
	answerQuestionError: 'anwering the question was not successful, please try it again',
	answerTheQuestion: 'answer the question',
	cantAnswerTheQuestionTwice:
		"It seems you have already answered the question wrong, you can't answer twice.",
	answeredCorrectly: 'You have answered correctly',
	answer: 'answer',
	congratulationForAnsweringTheQuestionCorrectly:
		'congratulation for the question answering correctly',
	answeredTheQuestionWrong: 'You answered the question wrong',
	notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this monument',
	nowYouCanTakeAPictureWithTheMonument: 'Now you can take a picture with this monument',
	monumentThatWasConnectedToTheExperienceWasDeleted:
		'monument that was connected to the experience was deleted',
	monumentCreateError: 'it was not successful to save your monument, please try it again',
	errorMessage: 'We are sorry, there was unpredictable error',
	tryItAgain: 'try it again',
	planningMapError: 'We are sorry, something went wrong during your wished path',
	saveQuestionError:
		'We are not able to save your question like this, please check if everything is filled',
	takePictureHere: 'take a picture here',
	reset: 'reset',
	language: 'language',
	theme: 'theme',
	you: 'you',
	pictureAlreadyTaken: 'picture already taken',
	cantCreateMonumentHereBecauseOfDistanceBetweenOtherMonuments:
		'You cant create monument here, because of distance between other monuments',
	save: 'save',
	addQuestion: 'add question',
	name: 'name',
	place: 'place',
	type: 'type',
	transport: 'transport',
	about: 'about',
	image: 'image',
	newMonumentWasAdded: 'new monument was added',
	chooseYourLocationForNotifications: 'choose your location for notifications',
	notificaionsLocation: 'notificaions location',
	change: 'change',
	cancel: 'cancel',
	yourLocationIsCurrently_InRangeOf:
		'your location is currently {location: number[]} of range {range: string}',
	experienceWasCreated: 'experience was created',
	notFound: 'not found'
} satisfies BaseTranslation;

export default en;
