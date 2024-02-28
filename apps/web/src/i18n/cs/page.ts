import { BaseTranslation } from 'typesafe-i18n';

export const pageCS = {
	signUp: {
		signUp: 'Registrovat se',
		signUpVia: 'Registrovat se přes {via: string}',
		signIn: 'Přihlásit se',
		usernameUserIdConditions:
			'Prosím, uživatelské jméno a uživatelské ID musí obsahovat minimálně 4 písmena. Vaše uživatelské ID automaticky obsahuje znak @, nemůžete použít žádné speciální znaky s výjimkou několika z nich (-, _)',
		acceptTerms: 'Přijmout podmínky pro užívání aplikace',
		passwordsDontMatch: 'Vaše hesla se neshodují',
		userAlreadyExists: 'Uživatel již existuje',
		title: 'Vítejte v aplikaci Tourmate, jsme rádi, že vás zde vidíme.',
		unsuccessfulRegister: 'Vaše registrace selhala'
	},
	signIn: {
		unsuccessfulLogin: 'Přihlášení nebylo úspěšné',
		singIn: 'Přihlásit se',
		forgottenPassword: 'Zapomenuté heslo',
		signUp: 'Registrovat se'
	},
	forgottenPassword: {
		title:
			'Zapomněli jste heslo? Obnovte si své heslo zde. Zadejte svou e-mailovou adresu do pole níže a čekejte na e-mail.',
		error:
			'Nepodařilo se vám odeslat e-mail s odkazem na obnovení hesla. Prosím, zkontrolujte svou e-mailovou adresu dvakrát a zkuste to znovu. Pokud se chyba opakuje, kontaktujte podporu Tourmate.',
		continue: 'Pokračovat',
		resetPassword: {
			passwordChaged: 'Heslo bylo úspěšně změněno.',
			error: 'Vaše heslo nebylo úspěšně změněno, zkuste to znovu nebo kontaktujte naši podporu.',
			recoverPassword: 'Obnovit heslo',
			recover: 'Obnovit heslo'
		}
	},
	account: {
		monuments: 'Zážitky',
		pictures: 'Obrázky',
		tours: 'Stesky',
		editProfileButtonLabel: 'Upravit profil',
		seeLikedMonumentsButtonLabel: 'Vidět oblíbené',
		settings: {
			language: 'Jazyk',
			theme: 'Téma',
			locationForNotifications: {
				title: 'Umístění pro oznámení',
				buttonLabel: 'Změnit'
			},
			logOut: {
				label: 'Odhlásit se',
				errorMessage: 'Odhlášení nebylo úspěšné'
			}
		},
		edit: {
			updateProfilePictureErrorMessage:
				'Omlouváme se, došlo k problému při aktualizaci profilového obrázku. Zkuste obnovit stránku a zkuste to znovu.',
			updateProfileErrorMessage:
				'Omlouváme se, došlo k problému při aktualizaci profilu. Váš uživatelský identifikátor již existuje v profilu jiného uživatele. Změňte svůj uživatelský identifikátor na jiný.'
		}
	},
	search: {
		categories: {
			users: 'Uživatelé',
			monuments: 'Památky',
			places: 'Místa'
		}
	},
	scan: {
		usersDistanceFromTarget: 'Jste vzdáleni {meters: string} od cíle.'
	},
	plan: {
		restart: 'Restartovat',
		planningError: 'Omlouváme se, něco se pokazilo při plánování vaší požadované trasy'
	},
	addMonument: {
		detail: {
			monumentCreated: 'Váš zážitek byl úspěšně vytvořen.',
			monumentCreateError: 'Váš zážitek nebyla úspěšně vytvořen. Zkuste to znovu.',
			create: 'Vytvořit'
		}
	},
	globalError: {
		title: 'Omlouváme se, došlo k nepředvídatelné chybě',
		reloadButtonLabel: 'Zkuste to znovu'
	},
	monument: {
		edit: {
			save: 'Uložit',
			updateError: 'Váš zážitek nebyl úspěšně aktualizován. Zkuste to znovu.'
		}
	},
	createNewExperience: {
		experienceWasCreated: 'Váše fotka byla úspěšně vytvořea',
		saveErrorMessage: 'Váše fotka nebyl vytvořena, zkuste to znovu',
		Footer: {
			answerQuestionError: 'Odpověď na otázku nebyla úspěšná. Zkuste to znovu.',
			cantAnswerTwice:
				'Zdá se, že jste již odpověděli špatně na otázku, nemůžete odpovědět dvakrát.',
			answeredCorrectly: 'Odpověděli jste správně',
			public: 'Zveřejnit obrázek',
			answerQuestion: 'Odpovězte na otázku'
		},
		Center: {
			cantFindAnyMonumentQuestion: 'Nemůžete najít žádný zážitek?',
			connectExperienceToMonument: 'Připojte fotku k zážitku',
			chooseMonumentFromMap: 'Vyberte zážitek z mapy'
		}
	},
	oauth: {
		success: {
			errorMessage:
				'Omlouváme se, nebylo nám možné přihlásit vás do aplikace Tourmate. Prosím, zkuste to znovu.'
		}
	},
	monumentsCount: {
		title: 'Počet zážitků',
		label: 'zážitků vytvořeno'
	},
	tour: {
		distanceToNextTargetLabel: 'Vzdálenost do dalšího místa je: ',
		youFinished: 'Pokořil jste celou tůru'
	}
} satisfies BaseTranslation;
