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
	removeLikeErrorMessage: 'Omlouváme se, ale nebylo možné odstranit váš like.'
} satisfies BaseTranslation;

export default cz;
