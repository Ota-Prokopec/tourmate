import type { BaseTranslation } from '../i18n-types';

const cz = {
	monuments: 'památky',
	pictures: 'fotky',
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
	createYourFirstMonument: 'vytvořte si váš první zážitek'
} satisfies BaseTranslation;

export default cz;
