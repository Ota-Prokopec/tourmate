// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'cs'
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	page: {
		signUp: {
			/**
			 * S​i​g​n​ ​u​p
			 */
			signUp: string
			/**
			 * S​i​g​n​ ​u​p​ ​v​i​a​ ​{​v​i​a​}
			 * @param {string} via
			 */
			signUpVia: RequiredParams<'via'>
			/**
			 * S​i​n​g​ ​i​n
			 */
			signIn: string
			/**
			 * P​l​e​a​s​e​ ​u​s​e​r​n​a​m​e​ ​a​n​d​ ​u​s​e​r​ ​i​d​ ​h​a​s​ ​c​o​n​t​a​i​n​ ​a​t​ ​l​e​a​s​t​ ​4​ ​l​e​t​t​e​r​s​.​ ​Y​o​u​r​ ​u​s​e​r​I​d​ ​w​i​l​l​ ​a​u​t​o​m​a​t​i​c​a​l​l​y​ ​c​o​n​t​a​i​n​ ​@​ ​c​h​a​r​a​c​t​e​r​,​ ​y​o​u​ ​w​i​l​l​ ​n​o​t​ ​b​e​ ​a​b​l​e​ ​t​o​ ​h​a​v​e​ ​a​n​y​ ​s​p​e​c​i​a​l​ ​c​h​a​r​a​c​t​e​r​s​ ​i​n​ ​y​o​u​r​ ​u​s​e​r​I​d​ ​e​x​c​l​u​d​i​n​g​ ​f​e​w​ ​o​f​ ​t​h​e​m​ ​(​-​,​ ​_​)
			 */
			usernameUserIdConditions: string
			/**
			 * A​c​c​e​p​t​ ​t​e​r​m​s​ ​a​n​d​ ​c​o​n​d​i​t​i​o​n​s
			 */
			acceptTerms: string
			/**
			 * Y​o​u​r​ ​p​a​s​s​w​o​r​d​s​ ​d​o​n​t​ ​m​a​t​c​h
			 */
			passwordsDontMatch: string
			/**
			 * U​s​e​r​ ​a​l​r​e​a​d​y​ ​e​x​i​s​t​s
			 */
			userAlreadyExists: string
			/**
			 * W​e​l​c​o​m​e​ ​i​n​t​o​ ​T​o​u​r​m​a​t​e​ ​a​p​p​,​ ​w​e​ ​a​r​e​ ​h​a​p​p​y​ ​t​o​ ​s​e​e​ ​y​o​u​ ​h​e​r​e​.
			 */
			title: string
			/**
			 * Y​o​u​r​ ​r​e​g​i​s​t​r​a​t​i​o​n​ ​f​a​i​l​e​d
			 */
			unsuccessfulRegister: string
		}
		signIn: {
			/**
			 * L​o​g​i​n​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l
			 */
			unsuccessfulLogin: string
			/**
			 * S​i​n​g​ ​i​n
			 */
			singIn: string
			/**
			 * F​o​r​g​o​t​t​e​n​ ​p​a​s​s​w​o​r​d
			 */
			forgottenPassword: string
			/**
			 * S​i​g​n​ ​u​p
			 */
			signUp: string
		}
		forgottenPassword: {
			/**
			 * D​i​d​ ​y​o​u​ ​f​o​r​g​e​t​ ​t​h​e​ ​p​a​s​s​w​o​r​d​?​ ​R​e​s​e​t​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​h​e​r​e​.​ ​P​a​s​s​ ​y​o​u​r​ ​e​-​m​a​i​l​ ​a​d​d​r​e​s​s​ ​i​n​ ​t​o​ ​t​h​e​ ​t​e​x​t​ ​f​i​e​l​d​ ​b​e​l​o​w​ ​a​n​d​ ​w​a​i​t​ ​f​o​r​ ​t​h​e​ ​e​-​m​a​i​l​.
			 */
			title: string
			/**
			 * I​t​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​ ​t​o​ ​s​e​n​d​ ​y​o​u​ ​a​n​ ​e​-​m​a​i​l​ ​w​i​t​h​ ​l​i​n​k​ ​t​o​ ​r​e​s​e​t​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​.​ ​P​l​e​a​s​e​ ​c​h​e​c​k​ ​y​o​u​r​ ​e​-​m​a​i​l​ ​a​d​d​r​e​s​s​ ​t​w​i​c​e​ ​a​n​d​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.​ ​I​f​ ​t​h​e​ ​e​r​r​o​r​ ​p​e​r​s​i​s​t​s​,​ ​p​l​e​a​s​e​ ​c​o​n​t​a​c​t​ ​t​h​e​ ​T​o​u​r​m​a​t​e​ ​s​u​p​p​o​r​t​.
			 */
			error: string
			/**
			 * C​o​n​t​i​n​u​e
			 */
			'continue': string
			resetPassword: {
				/**
				 * P​a​s​s​w​o​r​d​ ​w​a​s​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​h​a​n​g​e​d​.
				 */
				passwordChaged: string
				/**
				 * Y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​h​a​n​g​e​d​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​ ​o​r​ ​c​o​n​t​a​c​t​ ​o​u​r​ ​s​u​p​p​o​r​t​.
				 */
				error: string
				/**
				 * R​e​c​o​v​e​r​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d
				 */
				recoverPassword: string
				/**
				 * R​e​c​o​v​e​r​ ​p​a​s​s​w​o​r​d
				 */
				recover: string
			}
		}
		account: {
			/**
			 * E​x​p​e​r​i​e​n​c​e​s
			 */
			monuments: string
			/**
			 * P​i​c​t​u​r​e​s
			 */
			pictures: string
			/**
			 * T​o​u​r​s
			 */
			tours: string
			/**
			 * E​d​i​t​ ​p​r​o​f​i​l​e
			 */
			editProfileButtonLabel: string
			/**
			 * S​e​e​ ​l​i​k​e​d
			 */
			seeLikedMonumentsButtonLabel: string
			settings: {
				/**
				 * L​a​n​g​u​a​g​e
				 */
				language: string
				/**
				 * T​h​e​m​e
				 */
				theme: string
				locationForNotifications: {
					/**
					 * L​o​c​a​t​i​o​n​ ​f​o​r​ ​n​o​t​i​f​i​c​a​t​i​o​n​s
					 */
					title: string
					/**
					 * C​h​a​n​g​e
					 */
					buttonLabel: string
				}
				logOut: {
					/**
					 * L​o​g​ ​o​u​t
					 */
					label: string
					/**
					 * U​n​s​u​c​c​e​s​s​f​u​l​ ​l​o​g​ ​o​u​t
					 */
					errorMessage: string
				}
			}
			edit: {
				/**
				 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​i​n​ ​u​p​d​a​t​i​n​g​ ​y​o​u​r​ ​p​r​o​f​i​l​e​ ​p​i​c​t​u​r​e​.​ ​T​r​y​ ​t​o​ ​r​e​s​e​t​ ​t​h​e​ ​p​a​g​e​ ​a​n​d​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
				 */
				updateProfilePictureErrorMessage: string
				/**
				 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​t​h​e​r​e​ ​w​a​s​ ​a​ ​p​r​o​b​l​e​m​ ​i​n​ ​u​p​d​a​t​i​n​g​ ​y​o​u​r​ ​p​r​o​f​i​l​e​.​ ​Y​o​u​r​ ​u​s​e​r​I​d​ ​a​l​r​e​a​d​y​ ​e​x​i​s​t​s​ ​i​n​ ​a​n​o​t​h​e​r​ ​u​s​e​r​'​s​ ​p​r​o​f​i​l​e​.​ ​P​l​e​a​s​e​ ​c​h​a​n​g​e​ ​y​o​u​r​ ​u​s​e​r​I​d​ ​t​o​ ​a​n​o​t​h​e​r​.
				 */
				updateProfileErrorMessage: string
			}
		}
		search: {
			categories: {
				/**
				 * U​s​e​r​s
				 */
				users: string
				/**
				 * E​x​p​e​r​i​e​n​c​e​s
				 */
				monuments: string
				/**
				 * P​l​a​c​e​s
				 */
				places: string
			}
		}
		scan: {
			/**
			 * Y​o​u​ ​a​r​e​ ​{​m​e​t​e​r​s​}​ ​f​a​r​ ​f​r​o​m​ ​t​h​e​ ​t​a​r​g​e​t​.
			 * @param {string} meters
			 */
			usersDistanceFromTarget: RequiredParams<'meters'>
		}
		plan: {
			/**
			 * R​e​s​t​a​r​t
			 */
			restart: string
			/**
			 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​s​o​m​e​t​h​i​n​g​ ​w​e​n​t​ ​w​r​o​n​g​ ​d​u​r​i​n​g​ ​y​o​u​r​ ​w​i​s​h​e​d​ ​p​a​t​h
			 */
			planningError: string
		}
		addMonument: {
			detail: {
				/**
				 * Y​o​u​r​ ​e​x​p​e​r​i​e​n​c​e​ ​w​a​s​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​r​e​a​t​e​d​.
				 */
				monumentCreated: string
				/**
				 * Y​o​u​r​ ​e​x​p​e​r​i​e​n​c​e​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​r​e​a​t​e​d​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
				 */
				monumentCreateError: string
				/**
				 * C​r​e​a​t​e
				 */
				create: string
			}
		}
		globalError: {
			/**
			 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​t​h​e​r​e​ ​w​a​s​ ​u​n​p​r​e​d​i​c​t​a​b​l​e​ ​e​r​r​o​r
			 */
			title: string
			/**
			 * T​r​y​ ​i​t​ ​a​g​a​i​n
			 */
			reloadButtonLabel: string
		}
		monument: {
			edit: {
				/**
				 * S​a​v​e
				 */
				save: string
				/**
				 * Y​o​u​r​ ​e​x​p​e​r​i​e​n​c​e​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​u​p​d​a​t​e​d​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
				 */
				updateError: string
			}
		}
		createNewExperience: {
			/**
			 * Y​o​u​r​ ​n​e​w​ ​p​i​c​t​u​r​e​ ​w​a​s​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​r​e​a​t​e​d
			 */
			experienceWasCreated: string
			/**
			 * Y​o​u​r​ ​p​i​c​t​u​r​e​ ​w​a​s​ ​n​o​t​ ​c​r​e​a​t​e​d​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n
			 */
			saveErrorMessage: string
			Footer: {
				/**
				 * I​t​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​ ​t​o​ ​a​n​s​w​e​r​ ​t​h​e​ ​q​u​e​s​t​i​o​n​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
				 */
				answerQuestionError: string
				/**
				 * I​t​ ​s​e​e​m​s​ ​y​o​u​ ​h​a​v​e​ ​a​l​r​e​a​d​y​ ​a​n​s​w​e​r​e​d​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​w​r​o​n​g​,​ ​y​o​u​ ​c​a​n​'​t​ ​a​n​s​w​e​r​ ​t​w​i​c​e​.
				 */
				cantAnswerTwice: string
				/**
				 * Y​o​u​ ​a​n​s​w​e​r​e​d​ ​c​o​r​r​e​c​t​l​y
				 */
				answeredCorrectly: string
				/**
				 * P​u​b​l​i​c​ ​t​h​e​ ​p​i​c​t​u​r​e
				 */
				'public': string
				/**
				 * A​n​s​w​e​r​ ​t​h​e​ ​q​u​e​s​t​i​o​n
				 */
				answerQuestion: string
			}
			Center: {
				/**
				 * C​a​n​'​t​ ​f​i​n​d​ ​a​n​y​ ​e​x​p​e​r​i​e​n​c​e​?
				 */
				cantFindAnyMonumentQuestion: string
				/**
				 * C​o​n​n​e​c​t​ ​p​i​c​t​u​r​e​ ​t​o​ ​t​h​e​ ​e​x​p​e​r​i​e​n​c​e
				 */
				connectExperienceToMonument: string
				/**
				 * C​h​o​o​s​e​ ​e​x​p​e​r​i​e​n​c​e​ ​f​r​o​m​ ​t​h​e​ ​m​a​p
				 */
				chooseMonumentFromMap: string
			}
		}
		oauth: {
			success: {
				/**
				 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​w​e​ ​w​e​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​s​i​g​n​ ​y​o​u​ ​i​n​ ​t​h​e​ ​T​o​u​r​m​a​t​e​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
				 */
				errorMessage: string
			}
		}
		monumentsCount: {
			/**
			 * E​x​p​e​r​i​e​n​c​e​s​ ​c​o​u​n​t
			 */
			title: string
			/**
			 * E​x​p​e​r​i​e​n​c​e​s​ ​m​a​d​e
			 */
			label: string
		}
		tour: {
			/**
			 * D​i​s​t​a​n​c​e​ ​t​o​ ​n​e​x​t​ ​t​a​r​g​e​t​ ​i​s​:​ 
			 */
			distanceToNextTargetLabel: string
			/**
			 * Y​o​u​ ​f​i​n​i​s​h​e​d​ ​t​h​e​ ​t​o​u​r
			 */
			youFinished: string
		}
	}
	common: {
		/**
		 * o​r
		 */
		or: string
		/**
		 * a​n​d
		 */
		and: string
		/**
		 * n​e​x​t
		 */
		'continue': string
		/**
		 * b​a​c​k
		 */
		back: string
		/**
		 * p​i​c​t​u​r​e​s
		 */
		pictures: string
		/**
		 * m​o​n​u​m​e​n​t​s
		 */
		monuments: string
		/**
		 * p​i​c​t​u​r​e
		 */
		picture: string
		/**
		 * m​o​n​u​m​e​n​t
		 */
		monument: string
		/**
		 * y​e​s
		 */
		yes: string
		/**
		 * n​o
		 */
		no: string
		/**
		 * s​a​v​e
		 */
		save: string
		/**
		 * s​e​t​t​i​n​g​s
		 */
		settings: string
		topic: {
			/**
			 * c​a​s​t​l​e
			 */
			castle: string
			/**
			 * e​x​p​e​r​i​e​n​c​e
			 */
			monument: string
			/**
			 * p​e​r​s​o​n
			 */
			person: string
			/**
			 * h​i​k​i​n​g
			 */
			hiking: string
			/**
			 * z​o​o
			 */
			zoo: string
		}
	}
	component: {
		EmailInput: {
			/**
			 * E​n​t​e​r​ ​e​m​a​i​l
			 */
			label: string
		}
		PasswordInput: {
			/**
			 * E​n​t​e​r​ ​p​a​s​s​w​o​r​d
			 */
			label: string
		}
		UsernameInput: {
			/**
			 * E​n​t​e​r​ ​y​o​u​r​ ​n​a​m​e
			 */
			label: string
		}
		EmailSent: {
			/**
			 * W​e​ ​s​e​n​t​ ​y​o​u​ ​e​m​a​i​l​ ​c​o​n​f​i​r​m​a​t​i​o​n​.
			 */
			title: string
			/**
			 * O​p​e​n​ ​y​o​u​r​ ​e​m​a​i​l​ ​a​n​d​ ​c​l​i​c​k​ ​o​n​ ​t​h​e​ ​a​d​d​r​e​s​s​ ​w​e​ ​s​e​n​t​ ​y​o​u​.​ ​O​p​e​n​ ​t​h​e​ ​v​e​r​i​f​i​c​a​t​i​o​n​ ​U​R​L​ ​o​n​l​y​ ​i​n​ ​t​h​e​ ​s​a​m​e​ ​b​r​o​w​s​e​r​ ​o​f​ ​t​h​e​ ​s​a​m​e​ ​d​e​v​i​c​e​ ​t​h​a​t​ ​y​o​u​ ​r​e​g​i​s​t​e​r​e​d​ ​t​h​e​ ​u​s​e​r​!
			 */
			text: string
		}
		MyIdInput: {
			/**
			 * E​n​t​e​r​ ​y​o​u​r​ ​c​u​s​t​o​m​ ​T​o​u​r​m​a​t​e​ ​I​D
			 */
			label: string
		}
		MonumentCardComponent: {
			/**
			 * D​o​ ​y​o​u​ ​r​e​a​l​l​y​ ​w​a​n​t​ ​t​o​ ​d​e​l​e​t​e​ ​y​o​u​r​ ​e​x​p​e​r​i​e​n​c​e​?​ ​T​h​e​r​e​ ​i​s​ ​n​o​ ​w​a​y​ ​t​o​ ​g​e​t​ ​i​t​ ​b​a​c​k​.
			 */
			reallyDeleteTheMonumentLabel: string
			/**
			 * P​i​c​t​u​r​e​ ​a​l​r​e​a​d​y​ ​t​a​k​e​n
			 */
			pictureAlreadyTaken: string
		}
		LogOutButton: {
			/**
			 * L​o​g​ ​o​u​t
			 */
			label: string
		}
		MapSettings: {
			/**
			 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​y​o​u​r​ ​m​a​p​ ​p​r​e​f​e​r​e​n​c​e​s​ ​w​e​r​e​ ​n​o​t​ ​s​a​v​e​d​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​a​g​a​i​n​ ​l​a​t​e​r​.
			 */
			saveErrorMessage: string
			/**
			 * R​a​n​g​e​ ​o​f​ ​t​h​e​ ​m​a​p
			 */
			mapRange: string
			/**
			 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​y​o​u​ ​h​a​v​e​ ​t​o​ ​c​h​o​o​s​e​ ​a​ ​s​m​a​l​l​e​r​ ​m​a​p​ ​r​a​n​g​e
			 */
			exceededMaxRange: string
		}
		NoContent: {
			/**
			 * N​o​t​h​i​n​g​ ​f​o​u​n​d​ ​h​e​r​e
			 */
			notFound: string
		}
		MeasureDistancesMap: {
			/**
			 * R​e​s​e​t
			 */
			resetButtonLabel: string
		}
		MonumentCreateForm: {
			/**
			 * e​x​p​e​r​i​e​n​c​e​ ​n​a​m​e
			 */
			monumentName: string
			/**
			 * P​l​a​c​e
			 */
			place: string
			/**
			 * T​y​p​e
			 */
			type: string
			/**
			 * T​r​a​n​s​p​o​r​t
			 */
			transport: string
			/**
			 * A​b​o​u​t​ ​e​x​p​e​r​i​e​n​c​e
			 */
			about: string
			/**
			 * I​m​a​g​e
			 */
			image: string
		}
		AddQuestionDrawer: {
			/**
			 * W​e​ ​a​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​s​a​v​e​ ​y​o​u​r​ ​q​u​e​s​t​i​o​n​ ​l​i​k​e​ ​t​h​i​s​,​ ​p​l​e​a​s​e​ ​c​h​e​c​k​ ​i​f​ ​e​v​e​r​y​t​h​i​n​g​ ​i​s​ ​f​i​l​l​e​d​ ​u​p​.
			 */
			saveError: string
			/**
			 * Y​o​u​r​ ​q​u​e​s​t​i​o​n
			 */
			yourQuestion: string
			/**
			 * S​a​v​e
			 */
			save: string
			questionTypes: {
				/**
				 * C​h​o​i​c​e
				 */
				radio: string
				/**
				 * T​e​x​t
				 */
				text: string
				/**
				 * N​u​m​b​e​r
				 */
				number: string
			}
		}
		AddQuestionButton: {
			/**
			 * A​d​d​ ​y​o​u​r​ ​q​u​e​s​t​i​o​n
			 */
			label: string
			/**
			 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​y​o​u​ ​c​a​n​'​t​ ​e​d​i​t​ ​y​o​u​r​ ​q​u​e​s​t​i​o​n​ ​i​n​ ​t​h​e​ ​e​x​p​e​r​i​e​n​c​e​ ​b​e​c​a​u​s​e​ ​s​o​m​e​ ​p​e​o​p​l​e​ ​c​o​u​l​d​ ​h​a​v​e​ ​a​l​r​e​a​d​y​ ​a​n​s​w​e​r​e​d​.
			 */
			notAbleToEditQuestion: string
		}
		ImageInput: {
			/**
			 * T​h​r​o​u​g​h​ ​g​a​l​l​e​r​y
			 */
			throughGallery: string
			/**
			 * T​h​r​o​u​g​h​ ​c​l​i​p​b​o​a​r​d
			 */
			throughClipboard: string
			/**
			 * T​h​e​r​e​ ​i​s​ ​n​o​ ​p​i​c​t​u​r​e​ ​a​v​a​i​l​a​b​l​e​ ​i​n​ ​y​o​u​r​ ​c​l​i​p​b​o​a​r​d​.
			 */
			clipboardNotFound: string
		}
		CookiesAlert: {
			/**
			 * T​h​i​s​ ​s​i​t​e​ ​u​s​e​s​ ​c​o​o​k​i​e​s​ ​t​o​ ​s​t​o​r​e​ ​u​s​e​r​s​'​ ​s​e​s​s​i​o​n​s​ ​a​n​d​ ​u​s​e​r​s​'​ ​d​a​t​a​,​ ​i​n​c​l​u​d​i​n​g​ ​u​s​e​r​s​'​ ​c​u​r​r​e​n​t​ ​l​o​c​a​t​i​o​n​.
			 */
			title: string
			/**
			 * A​c​c​e​p​t​ ​c​o​o​k​i​e​s
			 */
			acceptButtonLabel: string
		}
		SeeOnMapButton: {
			/**
			 * S​e​e​ ​o​n​ ​m​a​p
			 */
			label: string
		}
		SeeMapButton: {
			/**
			 * S​e​e​ ​m​a​p
			 */
			label: string
		}
		SeeOnGoogleMapsButton: {
			/**
			 * S​e​e​ ​o​n​ ​G​o​o​g​l​e​ ​M​a​p​s
			 */
			label: string
		}
		TakePictureHereButton: {
			/**
			 * T​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​h​e​r​e
			 */
			label: string
		}
		ContinueButton: {
			/**
			 * C​o​n​t​i​n​u​e
			 */
			label: string
		}
		MonumentNotFoundDrawer: {
			/**
			 * C​a​n​'​t​ ​f​i​n​d​ ​a​n​y​ ​e​x​p​e​r​i​e​n​c​e​?
			 */
			cantFindAnyMonumentQuestion: string
			/**
			 * A​j​,​ ​a​j​,​ ​n​o​ ​e​x​p​e​r​i​e​n​c​e​ ​i​s​ ​h​e​r​e​.​.​.
			 */
			noMonumentHere: string
			/**
			 * I​f​ ​y​o​u​ ​c​a​n​'​t​ ​c​h​o​o​s​e​ ​f​r​o​m​ ​e​x​p​e​r​i​e​n​c​e​s​ ​t​h​a​t​ ​a​r​e​ ​s​h​o​w​n​ ​o​n​ ​t​h​e​ ​m​a​p​,​ ​y​o​u​ ​c​a​n​ ​c​r​e​a​t​e​ ​y​o​u​r​ ​o​w​n​.
			 */
			createNewOneMessage: string
			/**
			 * Y​o​u​ ​a​r​e​ ​i​n​ ​a​n​ ​a​r​e​a​ ​w​h​e​r​e​ ​t​h​e​r​e​ ​a​r​e​ ​n​o​ ​e​x​p​e​r​i​e​n​c​e​s​ ​y​o​u​ ​c​a​n​ ​c​o​n​n​e​c​t​ ​w​i​t​h​.​ ​Y​o​u​ ​w​i​l​l​ ​h​a​v​e​ ​t​o​ ​w​a​i​t​ ​u​n​t​i​l​ ​s​o​m​e​o​n​e​ ​c​r​e​a​t​e​s​ ​a​ ​n​e​w​ ​e​x​p​e​r​i​e​n​c​e​ ​i​n​ ​y​o​u​r​ ​a​r​e​a​,​ ​o​r​ ​y​o​u​ ​c​a​n​ ​c​r​e​a​t​e​ ​y​o​u​r​ ​o​w​n​ ​e​x​p​e​r​i​e​n​c​e​.
			 */
			noMonumentsHereMessage: string
		}
		CreateNewMonumentButton: {
			/**
			 * C​r​e​a​t​e​ ​a​ ​n​e​w​ ​e​x​p​e​r​i​e​n​c​e
			 */
			label: string
		}
		AnswerQuestionDrawer: {
			/**
			 * A​n​s​w​e​r
			 */
			answer: string
			/**
			 * Y​o​u​ ​a​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​t​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​w​i​t​h​ ​t​h​i​s​ ​e​x​p​e​r​i​e​n​c​e
			 */
			notAbleToTakeAPictureWithTheMonument: string
		}
		QuestionAnsweredWrongCard: {
			/**
			 * Y​o​u​ ​a​n​s​w​e​r​e​d​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​w​r​o​n​g
			 */
			title: string
			/**
			 * Y​o​u​ ​a​r​e​ ​n​o​t​ ​a​b​l​e​ ​t​o​ ​t​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​w​i​t​h​ ​t​h​i​s​ ​e​x​p​e​r​i​e​n​c​e
			 */
			notAbleToTakeAPictureWithTheMonument: string
		}
		QuestionAnsweredCorrectlyCard: {
			/**
			 * C​o​n​g​r​a​t​u​l​a​t​i​o​n​s​ ​f​o​r​ ​a​n​s​w​e​r​i​n​g​ ​t​h​e​ ​q​u​e​s​t​i​o​n​ ​c​o​r​r​e​c​t​l​y
			 */
			title: string
			/**
			 * N​o​w​ ​y​o​u​ ​c​a​n​ ​t​a​k​e​ ​a​ ​p​i​c​t​u​r​e​ ​w​i​t​h​ ​t​h​i​s​ ​e​x​p​e​r​i​e​n​c​e
			 */
			nowYouCanTakePictureWithTheMonument: string
		}
		SetLocationForNotificationsPage: {
			/**
			 * I​t​ ​w​a​s​ ​n​o​t​ ​s​u​c​c​e​s​s​f​u​l​ ​t​o​ ​s​e​t​ ​y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​f​o​r​ ​n​o​t​i​f​i​c​a​t​i​o​n​s
			 */
			errorMessage: string
			/**
			 * Y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​i​s​ ​c​u​r​r​e​n​t​l​y​ ​{​l​o​c​a​t​i​o​n​}​ ​o​f​ ​r​a​n​g​e​ ​{​r​a​n​g​e​}
			 * @param {number[]} location
			 * @param {string} range
			 */
			yourLocationIsCurrently_InRangeOf_: RequiredParams<'location' | 'range'>
			/**
			 * C​h​o​o​s​e​ ​y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​f​o​r​ ​n​o​t​i​f​i​c​a​t​i​o​n​s
			 */
			chooseYourLocationForNotifications: string
			/**
			 * C​a​n​c​e​l
			 */
			cancel: string
			/**
			 * S​a​v​e
			 */
			save: string
			/**
			 * W​h​e​n​ ​p​e​o​p​l​e​ ​c​r​e​a​t​e​ ​a​ ​n​e​w​ ​e​x​p​e​r​i​e​n​c​e​ ​a​n​d​ ​y​o​u​ ​s​u​b​s​c​r​i​b​e​ ​t​o​ ​t​h​a​t​ ​p​l​a​c​e​ ​w​h​e​r​e​ ​t​h​e​ ​e​x​p​e​r​i​e​n​c​e​ ​w​i​l​l​ ​b​e​ ​p​l​a​c​e​d​,​ ​y​o​u​ ​w​i​l​l​ ​b​e​ ​n​o​t​i​f​i​e​d​ ​a​b​o​u​t​ ​t​h​i​s​ ​n​e​w​ ​e​x​p​e​r​i​e​n​c​e​.
			 */
			help: string
		}
		CreateYourFirstPictureButton: {
			/**
			 * C​r​e​a​t​e​ ​y​o​u​r​ ​f​i​r​s​t​ ​p​i​c​t​u​r​e
			 */
			label: string
		}
		CreateYourFirstMonumentButton: {
			/**
			 * C​r​e​a​t​e​ ​y​o​u​r​ ​f​i​r​s​t​ ​e​x​p​e​r​i​e​n​c​e
			 */
			label: string
		}
		FirebaseMonumentNotification: {
			/**
			 * N​e​w​ ​e​x​p​e​r​i​e​n​c​e​ ​w​a​s​ ​a​d​d​e​d
			 */
			newMonumentWasAdded: string
		}
		UserMarker: {
			/**
			 * Y​o​u
			 */
			you: string
		}
		MoreInformationButton: {
			/**
			 * S​e​e​ ​m​o​r​e​ ​i​n​f​o​r​m​a​t​i​o​n
			 */
			label: string
		}
		ExperienceCardComponent: {
			/**
			 * E​x​p​e​r​i​e​n​c​e​ ​t​h​a​t​ ​w​a​s​ ​c​o​n​n​e​c​t​e​d​ ​t​o​ ​t​h​e​ ​p​i​c​t​u​r​e​ ​w​a​s​ ​d​e​l​e​t​e​d
			 */
			monumentThatWasConnectedToTheExperienceWasDeleted: string
			/**
			 * D​o​ ​y​o​u​ ​r​e​a​l​l​y​ ​w​a​n​t​ ​t​o​ ​d​e​l​e​t​e​ ​y​o​u​r​ ​p​i​c​t​u​r​e​?​ ​T​h​e​r​e​ ​i​s​ ​n​o​ ​w​a​y​ ​t​o​ ​g​e​t​ ​i​t​ ​b​a​c​k​.
			 */
			reallyDeleteYourExperienceQuestion: string
		}
		CancelButton: {
			/**
			 * C​a​n​c​e​l
			 */
			label: string
		}
		BasicImageInput: {
			/**
			 * C​l​i​c​k​ ​t​o​ ​u​p​l​o​a​d​ ​o​r​ ​d​r​a​g​ ​a​n​d​ ​d​r​o​p
			 */
			title: string
		}
		InstallApp: {
			/**
			 * I​n​s​t​a​l​l​ ​T​o​u​r​m​a​t​e​ ​a​p​p
			 */
			title: string
			/**
			 * I​n​s​t​a​l​l​ ​o​u​r​ ​T​o​u​r​m​a​t​e​ ​a​p​p​ ​f​o​r​ ​a​ ​b​e​t​t​e​r​ ​e​x​p​e​r​i​e​n​c​e
			 */
			text: string
			/**
			 * I​n​s​t​a​l​l
			 */
			installButtonLabel: string
			/**
			 * o​r​ ​u​s​e​ ​C​h​r​o​m​e​ ​v​e​r​s​i​o​n
			 */
			useChrome: string
		}
		Tutorial: {
			/**
			 * T​u​t​o​r​i​a​l
			 */
			title: string
			/**
			 * G​o​t​ ​i​t
			 */
			closeButtonLabel: string
		}
		WhatAppOffersButton: {
			/**
			 * W​h​a​t​ ​T​o​u​r​m​a​t​e​ ​o​f​f​e​r​s​ ​y​o​u
			 */
			label: string
		}
		CheckpointsSaveDrawer: {
			nameInput: {
				/**
				 * n​a​m​e​ ​o​f​ ​t​h​e​ ​t​o​u​r
				 */
				label: string
			}
		}
		TourNavigateToAccomplishMonumentCard: {
			/**
			 * Y​o​u​ ​a​r​e​ ​a​t​ ​t​h​e​ ​c​h​e​c​k​p​o​i​n​t​,​ ​d​o​ ​y​o​u​ ​w​a​n​t​ ​t​o​ ​a​c​c​o​m​p​l​i​s​h​ ​i​t​ ​n​o​w​?
			 */
			title: string
		}
	}
	error: {
		/**
		 * U​n​e​x​p​e​c​t​e​d​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d​,​ ​p​l​e​a​s​e​ ​s​h​a​r​e​ ​t​h​i​s​ ​w​i​t​h​ ​t​h​e​ ​s​u​p​p​o​r​t​ ​t​e​a​m
		 */
		unexpectedError: string
		/**
		 * A​c​c​o​u​n​t​ ​n​o​t​ ​f​o​u​n​d
		 */
		accountNotFound: string
		/**
		 * Y​o​u​r​ ​l​i​k​e​ ​w​a​s​ ​n​o​t​ ​r​e​c​o​r​d​e​d​.
		 */
		addLikeError: string
		/**
		 * W​e​ ​c​o​u​l​d​ ​n​o​t​ ​r​e​m​o​v​e​ ​y​o​u​r​ ​l​i​k​e​.
		 */
		removeLikeError: string
		/**
		 * {​w​h​a​t​}​ ​w​a​s​ ​n​o​t​ ​d​e​l​e​t​e​d​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
		 * @param {string} what
		 */
		deleteErrorMessage: RequiredParams<'what'>
		/**
		 * W​e​ ​c​o​u​l​d​ ​n​o​t​ ​l​o​a​d​ ​m​o​n​u​m​e​n​t​s​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​a​g​a​i​n​.
		 */
		monumentLoadErrorMessage: string
		/**
		 * W​e​ ​a​r​e​ ​s​o​r​r​y​,​ ​b​u​t​ ​y​o​u​ ​c​a​n​t​ ​c​r​e​a​t​e​ ​y​o​u​r​ ​m​o​n​u​m​e​n​t​ ​h​e​r​e​,​ ​b​e​c​a​u​s​e​ ​t​h​e​r​e​ ​a​r​e​ ​m​o​n​u​m​e​n​t​s​ ​t​h​a​t​ ​a​r​e​ ​t​o​o​ ​c​l​o​s​e​ ​t​o​ ​y​o​u​r​s​.​ ​P​l​e​a​s​e​ ​c​h​o​o​s​e​ ​a​n​o​t​h​e​r​ ​p​l​a​c​e​ ​f​o​r​ ​y​o​u​r​ ​m​o​n​u​m​e​n​t​ ​o​r​ ​c​o​n​t​a​c​t​ ​u​s​.
		 */
		notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage: string
		/**
		 * W​e​ ​a​r​e​ ​s​o​r​r​y​ ​b​u​t​ ​y​o​u​r​ ​l​o​c​a​t​i​o​n​ ​c​o​u​l​d​ ​n​o​t​ ​b​e​ ​l​o​a​d​e​d​.​ ​P​l​e​a​s​e​ ​r​e​t​u​r​n​ ​b​a​c​k​ ​a​n​d​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​.
		 */
		locationNowFoundErrorMessage: string
		/**
		 * S​o​m​e​t​h​i​n​g​ ​w​e​n​t​ ​w​r​o​n​g​,​ ​p​l​e​a​s​e​ ​t​r​y​ ​i​t​ ​a​g​a​i​n​ ​o​r​ ​i​n​f​o​r​m​ ​o​u​r​ ​s​u​p​p​o​r​t​.
		 */
		universalErrorMessage: string
		/**
		 * Y​o​u​r​ ​a​c​c​o​u​n​t​ ​w​a​s​ ​n​o​t​ ​f​o​u​n​d​.
		 */
		userNotFound: string
	}
}

export type TranslationFunctions = {
	page: {
		signUp: {
			/**
			 * Sign up
			 */
			signUp: () => LocalizedString
			/**
			 * Sign up via {via}
			 */
			signUpVia: (arg: { via: string }) => LocalizedString
			/**
			 * Sing in
			 */
			signIn: () => LocalizedString
			/**
			 * Please username and user id has contain at least 4 letters. Your userId will automatically contain @ character, you will not be able to have any special characters in your userId excluding few of them (-, _)
			 */
			usernameUserIdConditions: () => LocalizedString
			/**
			 * Accept terms and conditions
			 */
			acceptTerms: () => LocalizedString
			/**
			 * Your passwords dont match
			 */
			passwordsDontMatch: () => LocalizedString
			/**
			 * User already exists
			 */
			userAlreadyExists: () => LocalizedString
			/**
			 * Welcome into Tourmate app, we are happy to see you here.
			 */
			title: () => LocalizedString
			/**
			 * Your registration failed
			 */
			unsuccessfulRegister: () => LocalizedString
		}
		signIn: {
			/**
			 * Login was not successful
			 */
			unsuccessfulLogin: () => LocalizedString
			/**
			 * Sing in
			 */
			singIn: () => LocalizedString
			/**
			 * Forgotten password
			 */
			forgottenPassword: () => LocalizedString
			/**
			 * Sign up
			 */
			signUp: () => LocalizedString
		}
		forgottenPassword: {
			/**
			 * Did you forget the password? Reset your password here. Pass your e-mail address in to the text field below and wait for the e-mail.
			 */
			title: () => LocalizedString
			/**
			 * It was not successful to send you an e-mail with link to reset your password. Please check your e-mail address twice and try it again. If the error persists, please contact the Tourmate support.
			 */
			error: () => LocalizedString
			/**
			 * Continue
			 */
			'continue': () => LocalizedString
			resetPassword: {
				/**
				 * Password was successfully changed.
				 */
				passwordChaged: () => LocalizedString
				/**
				 * Your password was not successfully changed, please try it again or contact our support.
				 */
				error: () => LocalizedString
				/**
				 * Recover your password
				 */
				recoverPassword: () => LocalizedString
				/**
				 * Recover password
				 */
				recover: () => LocalizedString
			}
		}
		account: {
			/**
			 * Experiences
			 */
			monuments: () => LocalizedString
			/**
			 * Pictures
			 */
			pictures: () => LocalizedString
			/**
			 * Tours
			 */
			tours: () => LocalizedString
			/**
			 * Edit profile
			 */
			editProfileButtonLabel: () => LocalizedString
			/**
			 * See liked
			 */
			seeLikedMonumentsButtonLabel: () => LocalizedString
			settings: {
				/**
				 * Language
				 */
				language: () => LocalizedString
				/**
				 * Theme
				 */
				theme: () => LocalizedString
				locationForNotifications: {
					/**
					 * Location for notifications
					 */
					title: () => LocalizedString
					/**
					 * Change
					 */
					buttonLabel: () => LocalizedString
				}
				logOut: {
					/**
					 * Log out
					 */
					label: () => LocalizedString
					/**
					 * Unsuccessful log out
					 */
					errorMessage: () => LocalizedString
				}
			}
			edit: {
				/**
				 * We are sorry, but there was a problem in updating your profile picture. Try to reset the page and try it again.
				 */
				updateProfilePictureErrorMessage: () => LocalizedString
				/**
				 * We are sorry, but there was a problem in updating your profile. Your userId already exists in another user's profile. Please change your userId to another.
				 */
				updateProfileErrorMessage: () => LocalizedString
			}
		}
		search: {
			categories: {
				/**
				 * Users
				 */
				users: () => LocalizedString
				/**
				 * Experiences
				 */
				monuments: () => LocalizedString
				/**
				 * Places
				 */
				places: () => LocalizedString
			}
		}
		scan: {
			/**
			 * You are {meters} far from the target.
			 */
			usersDistanceFromTarget: (arg: { meters: string }) => LocalizedString
		}
		plan: {
			/**
			 * Restart
			 */
			restart: () => LocalizedString
			/**
			 * We are sorry, something went wrong during your wished path
			 */
			planningError: () => LocalizedString
		}
		addMonument: {
			detail: {
				/**
				 * Your experience was successfully created.
				 */
				monumentCreated: () => LocalizedString
				/**
				 * Your experience was not successfully created. Please try it again.
				 */
				monumentCreateError: () => LocalizedString
				/**
				 * Create
				 */
				create: () => LocalizedString
			}
		}
		globalError: {
			/**
			 * We are sorry, there was unpredictable error
			 */
			title: () => LocalizedString
			/**
			 * Try it again
			 */
			reloadButtonLabel: () => LocalizedString
		}
		monument: {
			edit: {
				/**
				 * Save
				 */
				save: () => LocalizedString
				/**
				 * Your experience was not successfully updated. Please try it again.
				 */
				updateError: () => LocalizedString
			}
		}
		createNewExperience: {
			/**
			 * Your new picture was successfully created
			 */
			experienceWasCreated: () => LocalizedString
			/**
			 * Your picture was not created, please try it again
			 */
			saveErrorMessage: () => LocalizedString
			Footer: {
				/**
				 * It was not successful to answer the question. Please try it again.
				 */
				answerQuestionError: () => LocalizedString
				/**
				 * It seems you have already answered the question wrong, you can't answer twice.
				 */
				cantAnswerTwice: () => LocalizedString
				/**
				 * You answered correctly
				 */
				answeredCorrectly: () => LocalizedString
				/**
				 * Public the picture
				 */
				'public': () => LocalizedString
				/**
				 * Answer the question
				 */
				answerQuestion: () => LocalizedString
			}
			Center: {
				/**
				 * Can't find any experience?
				 */
				cantFindAnyMonumentQuestion: () => LocalizedString
				/**
				 * Connect picture to the experience
				 */
				connectExperienceToMonument: () => LocalizedString
				/**
				 * Choose experience from the map
				 */
				chooseMonumentFromMap: () => LocalizedString
			}
		}
		oauth: {
			success: {
				/**
				 * We are sorry, we were not able to sign you in the Tourmate. Please try it again.
				 */
				errorMessage: () => LocalizedString
			}
		}
		monumentsCount: {
			/**
			 * Experiences count
			 */
			title: () => LocalizedString
			/**
			 * Experiences made
			 */
			label: () => LocalizedString
		}
		tour: {
			/**
			 * Distance to next target is: 
			 */
			distanceToNextTargetLabel: () => LocalizedString
			/**
			 * You finished the tour
			 */
			youFinished: () => LocalizedString
		}
	}
	common: {
		/**
		 * or
		 */
		or: () => LocalizedString
		/**
		 * and
		 */
		and: () => LocalizedString
		/**
		 * next
		 */
		'continue': () => LocalizedString
		/**
		 * back
		 */
		back: () => LocalizedString
		/**
		 * pictures
		 */
		pictures: () => LocalizedString
		/**
		 * monuments
		 */
		monuments: () => LocalizedString
		/**
		 * picture
		 */
		picture: () => LocalizedString
		/**
		 * monument
		 */
		monument: () => LocalizedString
		/**
		 * yes
		 */
		yes: () => LocalizedString
		/**
		 * no
		 */
		no: () => LocalizedString
		/**
		 * save
		 */
		save: () => LocalizedString
		/**
		 * settings
		 */
		settings: () => LocalizedString
		topic: {
			/**
			 * castle
			 */
			castle: () => LocalizedString
			/**
			 * experience
			 */
			monument: () => LocalizedString
			/**
			 * person
			 */
			person: () => LocalizedString
			/**
			 * hiking
			 */
			hiking: () => LocalizedString
			/**
			 * zoo
			 */
			zoo: () => LocalizedString
		}
	}
	component: {
		EmailInput: {
			/**
			 * Enter email
			 */
			label: () => LocalizedString
		}
		PasswordInput: {
			/**
			 * Enter password
			 */
			label: () => LocalizedString
		}
		UsernameInput: {
			/**
			 * Enter your name
			 */
			label: () => LocalizedString
		}
		EmailSent: {
			/**
			 * We sent you email confirmation.
			 */
			title: () => LocalizedString
			/**
			 * Open your email and click on the address we sent you. Open the verification URL only in the same browser of the same device that you registered the user!
			 */
			text: () => LocalizedString
		}
		MyIdInput: {
			/**
			 * Enter your custom Tourmate ID
			 */
			label: () => LocalizedString
		}
		MonumentCardComponent: {
			/**
			 * Do you really want to delete your experience? There is no way to get it back.
			 */
			reallyDeleteTheMonumentLabel: () => LocalizedString
			/**
			 * Picture already taken
			 */
			pictureAlreadyTaken: () => LocalizedString
		}
		LogOutButton: {
			/**
			 * Log out
			 */
			label: () => LocalizedString
		}
		MapSettings: {
			/**
			 * We are sorry, but your map preferences were not saved. Please try again later.
			 */
			saveErrorMessage: () => LocalizedString
			/**
			 * Range of the map
			 */
			mapRange: () => LocalizedString
			/**
			 * We are sorry, but you have to choose a smaller map range
			 */
			exceededMaxRange: () => LocalizedString
		}
		NoContent: {
			/**
			 * Nothing found here
			 */
			notFound: () => LocalizedString
		}
		MeasureDistancesMap: {
			/**
			 * Reset
			 */
			resetButtonLabel: () => LocalizedString
		}
		MonumentCreateForm: {
			/**
			 * experience name
			 */
			monumentName: () => LocalizedString
			/**
			 * Place
			 */
			place: () => LocalizedString
			/**
			 * Type
			 */
			type: () => LocalizedString
			/**
			 * Transport
			 */
			transport: () => LocalizedString
			/**
			 * About experience
			 */
			about: () => LocalizedString
			/**
			 * Image
			 */
			image: () => LocalizedString
		}
		AddQuestionDrawer: {
			/**
			 * We are not able to save your question like this, please check if everything is filled up.
			 */
			saveError: () => LocalizedString
			/**
			 * Your question
			 */
			yourQuestion: () => LocalizedString
			/**
			 * Save
			 */
			save: () => LocalizedString
			questionTypes: {
				/**
				 * Choice
				 */
				radio: () => LocalizedString
				/**
				 * Text
				 */
				text: () => LocalizedString
				/**
				 * Number
				 */
				number: () => LocalizedString
			}
		}
		AddQuestionButton: {
			/**
			 * Add your question
			 */
			label: () => LocalizedString
			/**
			 * We are sorry, you can't edit your question in the experience because some people could have already answered.
			 */
			notAbleToEditQuestion: () => LocalizedString
		}
		ImageInput: {
			/**
			 * Through gallery
			 */
			throughGallery: () => LocalizedString
			/**
			 * Through clipboard
			 */
			throughClipboard: () => LocalizedString
			/**
			 * There is no picture available in your clipboard.
			 */
			clipboardNotFound: () => LocalizedString
		}
		CookiesAlert: {
			/**
			 * This site uses cookies to store users' sessions and users' data, including users' current location.
			 */
			title: () => LocalizedString
			/**
			 * Accept cookies
			 */
			acceptButtonLabel: () => LocalizedString
		}
		SeeOnMapButton: {
			/**
			 * See on map
			 */
			label: () => LocalizedString
		}
		SeeMapButton: {
			/**
			 * See map
			 */
			label: () => LocalizedString
		}
		SeeOnGoogleMapsButton: {
			/**
			 * See on Google Maps
			 */
			label: () => LocalizedString
		}
		TakePictureHereButton: {
			/**
			 * Take a picture here
			 */
			label: () => LocalizedString
		}
		ContinueButton: {
			/**
			 * Continue
			 */
			label: () => LocalizedString
		}
		MonumentNotFoundDrawer: {
			/**
			 * Can't find any experience?
			 */
			cantFindAnyMonumentQuestion: () => LocalizedString
			/**
			 * Aj, aj, no experience is here...
			 */
			noMonumentHere: () => LocalizedString
			/**
			 * If you can't choose from experiences that are shown on the map, you can create your own.
			 */
			createNewOneMessage: () => LocalizedString
			/**
			 * You are in an area where there are no experiences you can connect with. You will have to wait until someone creates a new experience in your area, or you can create your own experience.
			 */
			noMonumentsHereMessage: () => LocalizedString
		}
		CreateNewMonumentButton: {
			/**
			 * Create a new experience
			 */
			label: () => LocalizedString
		}
		AnswerQuestionDrawer: {
			/**
			 * Answer
			 */
			answer: () => LocalizedString
			/**
			 * You are not able to take a picture with this experience
			 */
			notAbleToTakeAPictureWithTheMonument: () => LocalizedString
		}
		QuestionAnsweredWrongCard: {
			/**
			 * You answered the question wrong
			 */
			title: () => LocalizedString
			/**
			 * You are not able to take a picture with this experience
			 */
			notAbleToTakeAPictureWithTheMonument: () => LocalizedString
		}
		QuestionAnsweredCorrectlyCard: {
			/**
			 * Congratulations for answering the question correctly
			 */
			title: () => LocalizedString
			/**
			 * Now you can take a picture with this experience
			 */
			nowYouCanTakePictureWithTheMonument: () => LocalizedString
		}
		SetLocationForNotificationsPage: {
			/**
			 * It was not successful to set your location for notifications
			 */
			errorMessage: () => LocalizedString
			/**
			 * Your location is currently {location} of range {range}
			 */
			yourLocationIsCurrently_InRangeOf_: (arg: { location: number[], range: string }) => LocalizedString
			/**
			 * Choose your location for notifications
			 */
			chooseYourLocationForNotifications: () => LocalizedString
			/**
			 * Cancel
			 */
			cancel: () => LocalizedString
			/**
			 * Save
			 */
			save: () => LocalizedString
			/**
			 * When people create a new experience and you subscribe to that place where the experience will be placed, you will be notified about this new experience.
			 */
			help: () => LocalizedString
		}
		CreateYourFirstPictureButton: {
			/**
			 * Create your first picture
			 */
			label: () => LocalizedString
		}
		CreateYourFirstMonumentButton: {
			/**
			 * Create your first experience
			 */
			label: () => LocalizedString
		}
		FirebaseMonumentNotification: {
			/**
			 * New experience was added
			 */
			newMonumentWasAdded: () => LocalizedString
		}
		UserMarker: {
			/**
			 * You
			 */
			you: () => LocalizedString
		}
		MoreInformationButton: {
			/**
			 * See more information
			 */
			label: () => LocalizedString
		}
		ExperienceCardComponent: {
			/**
			 * Experience that was connected to the picture was deleted
			 */
			monumentThatWasConnectedToTheExperienceWasDeleted: () => LocalizedString
			/**
			 * Do you really want to delete your picture? There is no way to get it back.
			 */
			reallyDeleteYourExperienceQuestion: () => LocalizedString
		}
		CancelButton: {
			/**
			 * Cancel
			 */
			label: () => LocalizedString
		}
		BasicImageInput: {
			/**
			 * Click to upload or drag and drop
			 */
			title: () => LocalizedString
		}
		InstallApp: {
			/**
			 * Install Tourmate app
			 */
			title: () => LocalizedString
			/**
			 * Install our Tourmate app for a better experience
			 */
			text: () => LocalizedString
			/**
			 * Install
			 */
			installButtonLabel: () => LocalizedString
			/**
			 * or use Chrome version
			 */
			useChrome: () => LocalizedString
		}
		Tutorial: {
			/**
			 * Tutorial
			 */
			title: () => LocalizedString
			/**
			 * Got it
			 */
			closeButtonLabel: () => LocalizedString
		}
		WhatAppOffersButton: {
			/**
			 * What Tourmate offers you
			 */
			label: () => LocalizedString
		}
		CheckpointsSaveDrawer: {
			nameInput: {
				/**
				 * name of the tour
				 */
				label: () => LocalizedString
			}
		}
		TourNavigateToAccomplishMonumentCard: {
			/**
			 * You are at the checkpoint, do you want to accomplish it now?
			 */
			title: () => LocalizedString
		}
	}
	error: {
		/**
		 * Unexpected error has occurred, please share this with the support team
		 */
		unexpectedError: () => LocalizedString
		/**
		 * Account not found
		 */
		accountNotFound: () => LocalizedString
		/**
		 * Your like was not recorded.
		 */
		addLikeError: () => LocalizedString
		/**
		 * We could not remove your like.
		 */
		removeLikeError: () => LocalizedString
		/**
		 * {what} was not deleted, please try it again.
		 */
		deleteErrorMessage: (arg: { what: string }) => LocalizedString
		/**
		 * We could not load monuments, please try again.
		 */
		monumentLoadErrorMessage: () => LocalizedString
		/**
		 * We are sorry, but you cant create your monument here, because there are monuments that are too close to yours. Please choose another place for your monument or contact us.
		 */
		notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage: () => LocalizedString
		/**
		 * We are sorry but your location could not be loaded. Please return back and try it again.
		 */
		locationNowFoundErrorMessage: () => LocalizedString
		/**
		 * Something went wrong, please try it again or inform our support.
		 */
		universalErrorMessage: () => LocalizedString
		/**
		 * Your account was not found.
		 */
		userNotFound: () => LocalizedString
	}
}

export type Formatters = {}
