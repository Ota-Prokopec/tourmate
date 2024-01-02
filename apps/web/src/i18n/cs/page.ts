import { BaseTranslation } from 'typesafe-i18n';

export const pageCS = {
	signUp: {
		signUp: 'registrovat se',
		signUpVia: 'registrovat se přes {via: string}',
		signIn: 'přihlásit se',
		usernameUserIdConditions:
			'Prosím, uživatelské jméno a uživatelské ID musí obsahovat minimálně 4 písmena. Vaše uživatelské ID automaticky obsahuje znak @, nemůžete použít žádné speciální znaky s výjimkou několika z nich (-, _)',
		acceptTerms: 'přijmout obchodní podmínky',
		passwordsDontMatch: 'Vaše hesla se neshodují',
		userAlreadyExists: 'uživatel již existuje',
		title: 'Vítejte v aplikaci Experience, jsme rádi, že vás zde vidíme.',
		unsuccessfulRegister: 'Vaše registrace selhala'
	},
	signIn: {
		unsuccessfulLogin: 'přihlášení nebylo úspěšné',
		singIn: 'přihlásit se',
		forgottenPassword: 'zapomenuté heslo',
		signUp: 'registrovat se'
	},
	forgottenPassword: {
		title:
			'Zapomněli jste heslo? Obnovte si své heslo zde. Zadejte svou e-mailovou adresu do pole níže a čekejte na e-mail.',
		error:
			'Nepodařilo se vám odeslat e-mail s odkazem na obnovení hesla. Prosím, zkontrolujte svou e-mailovou adresu dvakrát a zkuste to znovu. Pokud se chyba opakuje, kontaktujte podporu Tourmate.',
		continue: 'pokračovat',
		resetPassword: {
			passwordChaged: 'Heslo bylo úspěšně změněno.',
			error: 'Vaše heslo nebylo úspěšně změněno, zkuste to znovu nebo kontaktujte naši podporu.',
			recoverPassword: 'Obnovit heslo',
			recover: 'obnovit heslo'
		}
	},
	account: {
		monuments: 'zážitky',
		pictures: 'obrázky',
		editProfileButtonLabel: 'upravit profil',
		settings: {
			language: 'jazyk',
			theme: 'téma',
			locationForNotifications: {
				title: 'umístění pro oznámení',
				buttonLabel: 'změnit'
			},
			logOut: {
				label: 'odhlásit se',
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
			users: 'uživatelé',
			monuments: 'památky',
			places: 'místa'
		}
	},
	scan: {
		usersDistanceFromTarget: 'jste vzdáleni {meters: string} od cíle.'
	},
	plan: {
		restart: 'restartovat',
		planningError: 'Omlouváme se, něco se pokazilo při plánování vaší požadované trasy'
	},
	addMonument: {
		detail: {
			monumentCreated: 'Vaše památka byla úspěšně vytvořena.',
			monumentCreateError: 'Vaše památka nebyla úspěšně vytvořena. Zkuste to znovu.',
			create: 'vytvořit'
		}
	},
	globalError: {
		title: 'Omlouváme se, došlo k nepředvídatelné chybě',
		reloadButtonLabel: 'zkuste to znovu'
	},
	monument: {
		edit: {
			save: 'uložit',
			updateError: 'Vaše památka nebyla úspěšně aktualizována. Zkuste to znovu.'
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
			public: 'zveřejnit obrázek',
			answerQuestion: 'Odpovězte na otázku'
		},
		Center: {
			cantFindAnyMonumentQuestion: 'nemůžete najít žádnou památku?',
			connectExperienceToMonument: 'připojte zážitek k památce',
			chooseMonumentFromMap: 'vyberte zážitek z mapy'
		}
	},
	oauth: {
		success: {
			errorMessage:
				'Omlouváme se, nebylo nám možné přihlásit vás do aplikace Tourmate. Prosím, zkuste to znovu.'
		}
	}
} satisfies BaseTranslation;
