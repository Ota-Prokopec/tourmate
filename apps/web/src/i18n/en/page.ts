import { BaseTranslation } from 'typesafe-i18n';

export const pageEN = {
	signUp: {
		signUp: 'Sign up',
		signUpVia: 'Sign up via {via: string}',
		signIn: 'Sing in',
		usernameUserIdConditions:
			'Please username and user id has contain at least 4 letters. Your userId will automatically contain @ character, you will not be able to have any special characters in your userId excluding few of them (-, _)',
		acceptTerms: 'Accept terms and conditions',
		passwordsDontMatch: 'Your passwords dont match',
		userAlreadyExists: 'User already exists',
		title: 'Welcome into Tourmate app, we are happy to see you here.',
		unsuccessfulRegister: 'Your registration failed'
	},
	signIn: {
		unsuccessfulLogin: 'Login was not successful',
		singIn: 'Sing in',
		forgottenPassword: 'Forgotten password',
		signUp: 'Sign up'
	},
	forgottenPassword: {
		title:
			'Did you forget the password? Reset your password here. Pass your e-mail address in to the text field below and wait for the e-mail.',
		error:
			'It was not successful to send you an e-mail with link to reset your password. Please check your e-mail address twice and try it again. If the error persists, please contact the Tourmate support.',
		continue: 'Continue',
		resetPassword: {
			passwordChaged: 'Password was successfully changed.',
			error:
				'Your password was not successfully changed, please try it again or contact our support.',
			recoverPassword: 'Recover your password',
			recover: 'Recover password'
		}
	},
	account: {
		monuments: 'Experiences',
		pictures: 'Pictures',
		tours: 'Tours',
		editProfileButtonLabel: 'Edit profile',
		seeLikedMonumentsButtonLabel: 'See liked',
		settings: {
			language: 'Language',
			theme: 'Theme',
			locationForNotifications: {
				title: 'Location for notifications',
				buttonLabel: 'Change'
			},
			logOut: {
				label: 'Log out',
				errorMessage: 'Unsuccessful log out'
			}
		},
		edit: {
			updateProfilePictureErrorMessage:
				'We are sorry, but there was a problem in updating your profile picture. Try to reset the page and try it again.',
			updateProfileErrorMessage:
				"We are sorry, but there was a problem in updating your profile. Your userId already exists in another user's profile. Please change your userId to another."
		}
	},
	search: {
		categories: {
			users: 'Users',
			monuments: 'Experiences',
			places: 'Places'
		}
	},
	scan: {
		usersDistanceFromTarget: 'You are {meters: string} far from the target.'
	},
	plan: {
		restart: 'Restart',
		planningError: 'We are sorry, something went wrong during your wished path'
	},
	addMonument: {
		detail: {
			monumentCreated: 'Your experience was successfully created.',
			monumentCreateError: 'Your experience was not successfully created. Please try it again.',
			create: 'Create'
		}
	},
	globalError: {
		title: 'We are sorry, there was unpredictable error',
		reloadButtonLabel: 'Try it again'
	},
	monument: {
		edit: {
			save: 'Save',
			updateError: 'Your experience was not successfully updated. Please try it again.'
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
			public: 'Public the picture',
			answerQuestion: 'Answer the question'
		},
		Center: {
			cantFindAnyMonumentQuestion: "Can't find any experience?",
			connectExperienceToMonument: 'Connect picture to the experience',
			chooseMonumentFromMap: 'Choose experience from the map'
		}
	},
	oauth: {
		success: {
			errorMessage:
				'We are sorry, we were not able to sign you in the Tourmate. Please try it again.'
		}
	},
	monumentsCount: {
		title: 'Experiences count',
		label: 'Experiences made'
	},
	tour: {
		distanceToNextTargetLabel: 'Distance to next target is: ',
		youFinished: 'You finished the tour',
		create: {
			tourSavedMessage: 'Your tour has been saved'
		}
	}
} satisfies BaseTranslation;
