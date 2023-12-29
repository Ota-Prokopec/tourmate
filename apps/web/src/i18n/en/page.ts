import { BaseTranslation } from 'typesafe-i18n';

export const pageEN = {
	signUp: {
		signUp: 'sign up',
		signUpVia: 'sign up via {via: string}',
		signIn: 'sing in',
		usernameUserIdConditions:
			'Please username and user id has contain at least 4 letters. Your userId will automatically contain @ character, you will not be able to have any special characters in your userId excluding few of them (-, _)',
		acceptTerms: 'accept terms and conditions',
		passwordsDontMatch: 'Your passwords dont match',
		userAlreadyExists: 'user already exists',
		title: 'Welcome into experinece app, we are happy to see you here.',
		unsuccessfulRegister: 'Your registration failed'
	},
	signIn: {
		unsuccessfulLogin: 'login was not successful',
		singIn: 'sing in',
		forgottenPassword: 'forgotten password',
		signUp: 'sign up'
	},
	forgottenPassword: {
		title:
			'Did you forget the password? Reset your password here. Pass your e-mail address in to the text field bellow and wait for the e-mail.',
		error:
			'It was not successful to send you an e-mail with link to reset your password. Please chech your e-mail address twice and try it again. If the error persists, please contact the Tourmate support.',
		continue: 'continue',
		resetPassword: {
			passwordChaged: 'Password was successfully changed.',
			error:
				'Your password was not successfully changed, please try it again or contact our support.',
			recoverPassword: 'Recover your password',
			recover: 'recover password'
		}
	},
	account: {
		monuments: 'experiences',
		pictures: 'pictures',
		settings: {
			language: 'language',
			theme: 'theme',
			locationForNotifications: {
				title: 'location for notifications',
				buttonLabel: 'change'
			},
			logOut: {
				label: 'log out',
				errorMessage: 'Unsuccessful log out'
			}
		}
	},
	search: {
		categories: {
			users: 'users',
			monuments: 'monuments',
			places: 'places'
		}
	},
	scan: {
		usersDistanceFromTarget: 'you are {meters: string} far from the target.'
	},
	plan: {
		restart: 'restart',
		planningError: 'We are sorry, something went wrong during your wished path'
	},
	addMonument: {
		distanceBetweenMonumentsTooSmall:
			'We are sorry, but you cant create your monument here, because there are monuments that are too close to yours. Please choose another place for your monument or contact us.',
		markHere: 'mark here',
		detail: {
			monumentCreated: 'Your monument was successfully created.',
			monumentCreateError: 'Your monument was not successfully created. Please try it again.',
			create: 'create'
		}
	},
	globalError: {
		title: 'We are sorry, there was unpredictable error',
		reloadButtonLabel: 'try it again'
	}
} satisfies BaseTranslation;
