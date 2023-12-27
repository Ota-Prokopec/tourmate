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
	account: {
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
	}
} satisfies BaseTranslation;
