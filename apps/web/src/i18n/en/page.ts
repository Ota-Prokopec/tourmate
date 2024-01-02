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
		editProfileButtonLabel: 'edit profile',
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
		},
		edit: {
			updateProfilePictureErrorMessage:
				'We are sorry, but there was a problem in updating your profile picture. Try to reset the page and try it again.',
			updateProfileErrorMessage:
				'We are sorry, but there was a problem in updating your profile. Your userId already exists in another users profile. Please change your userId to another.'
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
		detail: {
			monumentCreated: 'Your monument was successfully created.',
			monumentCreateError: 'Your monument was not successfully created. Please try it again.',
			create: 'create'
		}
	},
	globalError: {
		title: 'We are sorry, there was unpredictable error',
		reloadButtonLabel: 'try it again'
	},
	monument: {
		edit: {
			save: 'save',
			updateError: 'Your monument was not successfully updated. Please try it again.'
		}
	},
	createNewExperience: {
		experienceWasCreated: 'Your new picture was successfully created',
		saveErrorMessage: 'Your picture was not created, please try it again',
		Footer: {
			answerQuestionError: 'It was not successful to answer the question. Please try it again.',
			cantAnswerTwice:
				"It seems you have already answered the question wrong, you can't answer twice.",
			answeredCorrectly: 'You answered correctly',
			public: 'public the picture',
			answerQuestion: 'Answer the question'
		},
		Center: {
			cantFindAnyMonumentQuestion: "can't find any monument?",
			connectExperienceToMonument: 'connect experience to the monument',
			chooseMonumentFromMap: 'choose exprerience from the map'
		}
	},
	oauth: {
		success: {
			errorMessage:
				'We are sorry, we were not able to sign you in the Tourmate. Please try it again.'
		}
	}
} satisfies BaseTranslation;
