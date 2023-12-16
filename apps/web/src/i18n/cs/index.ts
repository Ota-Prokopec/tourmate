import type { BaseTranslation } from '../i18n-types';

const cz = {
	monuments: 'památky',
	pictures: 'fotky',
	monument: 'zážitek',
	experience: 'obrázek',
	places: 'místa',
	monumentsLoadErrorTitle: 'Monuments were not loaded',
	monumentsLoadErrorMessage:
		'We are sorry, but there was a problem in loading monuments on map. Try to reset the page.',

	updateProfilePictureErrorMessage:
		'We are sorry, but there was a problem in updating your profile picture. Try to reset the page and try it again.',
	updateProfileErrorTitle: 'Profile was not updated',
	updateProfileErrorMessage:
		'We are sorry, but there was a problem in updating your profile. Try to reset the page and try it again.',

	saveErrorTitle: '{what: string} - neuloženo',
	saveErrorMessage: '{what: string} - nepovedlo se uložit, prosíme zkuste to znovu.',
	updateErrorTitle: '{what: string} - neaktualizováno',
	updateErrorMessage: '{what: string} - nepovedlo se aktualizovat, prosíme zkuste to znovu.',
	deleteErrorTitle: '{what: string} - nebylo odstraněno',
	deleteErrorMessage: '{what: string} - nebylo odstraněno, prosíme zkuste to znovu.',

	userName: 'uživatelské jméno',
	forgotenPassword: 'zapomenuté heslo',
	signUp: 'zaregistrovat se',
	signUpVia: 'zaregistrovat se přes {via: string}',
	unsuccessfulLogin: 'přihlášení se nezdařilo',
	unsuccessfulRegister: 'registrace se nezdařila',
	regitrationPageTitle: 'Vítejte do aplikace experience.',
	registrationPageUsernameUserIdConditions:
		'uživatelské jméno a experienceId musí obsahovat nejméně 4 písmena',
	acceptTerms: 'souhlasit s právy a povinostma',
	or: 'nebo',
	passwordsDontMatch: 'Vaše hesla se neshodují',
	userAlreadyExists: 'uživatel již existuje',
	takeYourFirstPicture: 'vyfoťte si vaši první fotku',
	createYourFirstMonument: 'vytvořte si váš první zážitek',
	and: 'a',
	seeOnGoogleMaps: 'Vidět na Google mapách',
	seeMore: 'zjistit více',
	continue: 'pokračovat',
	toEditor: 'do editoru',
	skipEditor: 'pokračovat bez editace',
	locationNowFoundErrorTitle: 'Lokace nebyla nalezena',
	locationNowFoundErrorMessage:
		'Je nám líto, ale nepodařilo se nám načíst vaše lokace. Prosíme vraťte se zpět a zkuste to znovu.',
	back: 'zpět',
	addThisLabel: 'přidat tento text',
	deleteMonumentErrorTitle: 'Smazání zážitku neproběhlo úspěšně',
	deleteMonumentErrorMessage:
		'Je nám líto, ale vyskytl se problém při mazání vašeho zážitku. Prosím zkuste to znovu nebo nás kontaktujte.',
	reallyDeleteYour_Question:
		'Opravdu chcete vymazat {what: string}, není tu možnost dostat vaše data nazpět.',
	likeErrorTitle: 'Váš like nebyl zaznamenám',
	likeErrorMessage:
		'Je nám líto, ale vyskytl se problém při liking. Prosíme zkuste obnovit aplikaci.',
	removeLikeErrorTitle: 'Váš like se neodstranil',
	removeLikeErrorMessage: 'Omlouváme se, ale nebylo možné odstranit váš like.',
	seeOnMap: 'vidět na mapě',
	notAbleToConnectMonumentBecauseOfDistanceErrorTitle:
		'Není možno připojit tento zážitek k vaší fotce',
	notAbleToConnectMonumentBecauseOfDistanceErrorMessage:
		'Není možno připojit tento zážitek k vaší fotce neboť jste od ní příliš vzdáleni, můžete zkusit se přiblížit k tomuto zážitku nebo si můžete vybrat jiný zážitek ke kterému byste fotku připojili.',
	showMap: 'ukázat mapu',
	cantFindAnyMonumentQuestion: 'nemůžete najít žádný zážitek?',
	connectExperienceToMonument: 'připojit fotku k zážitku',
	enterEmail: 'zadejte e-mail',
	enterPassword: 'zadejte heslo',
	editProfile: 'upravit účet',
	logOut: 'odhlásit se',
	logOutError: 'logout was not successful',
	monumentIncludesQuestion: 'zážitek obsahuje otázku',
	thereIsNoQuestionInMonument: 'v zážitku není žádná otázka',
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
	language: 'jazyk',
	theme: 'téma',
	you: 'ty',
	pictureAlreadyTaken: 'picture already taken',
	cantCreateMonumentHereBecauseOfDistanceBetweenOtherMonuments:
		'You cant create monument here, because of distance between other monuments',
	save: 'uložit',
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
		'your location is currently {location: any} of range {range: string}',
	experienceWasCreated: 'experience was created'
} satisfies BaseTranslation;

export default cz;
