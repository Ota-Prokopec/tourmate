import { BaseTranslation } from 'typesafe-i18n';

export const pageCS = {
	signUp: {
		signUp: 'registrovat se',
		signUpVia: 'registrovat přes {via: string}',
		signIn: 'přihlásit se',
		usernameUserIdConditions:
			'Prosím, uživatelské jméno a ID uživatele musí obsahovat minimálně 4 písmena. Vaše ID automaticky obsahuje znak @, nemůžete mít žádné speciální znaky ve svém ID kromě několika z nich (-, _)',
		acceptTerms: 'přijmout podmínky a ujednání',
		passwordsDontMatch: 'Vaše hesla se neshodují',
		userAlreadyExists: 'uživatel již existuje',
		title: 'Vítejte v aplikaci Experience, jsme rádi, že vás zde vidíme.',
		unsuccessfulRegister: 'Registrace se nezdařila'
	},
	signIn: {
		unsuccessfulLogin: 'přihlášení nebylo úspěšné',
		singIn: 'přihlásit se',
		forgottenPassword: 'zapomenuté heslo',
		signUp: 'registrace'
	},
	forgottenPassword: {
		title:
			'Zapomněli jste heslo? Obnovte své heslo zde. Vložte svou e-mailovou adresu do pole níže a čekejte na e-mail.',
		error:
			'Nepodařilo se vám poslat e-mail s odkazem na obnovení hesla. Zkontrolujte svou e-mailovou adresu dvakrát a zkuste to znovu. Pokud chyba přetrvává, obraťte se na podporu Tourmate.',
		continue: 'pokračovat',
		resetPassword: {
			passwordChaged: 'Heslo bylo úspěšně změněno.',
			error: 'Vaše heslo nebylo úspěšně změněno, zkuste to znovu nebo kontaktujte naši podporu.',
			recoverPassword: 'Obnovte své heslo',
			recover: 'obnovit heslo'
		}
	},
	account: {
		settings: {
			language: 'jazyk',
			theme: 'téma',
			locationForNotifications: {
				title: 'umístění pro oznámení',
				buttonLabel: 'změnit'
			},
			logOut: {
				label: 'odhlásit se',
				errorMessage: 'Neúspěšné odhlášení'
			}
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
		usersDistanceFromTarget: 'jste vzdáleni cíli o {meters: string}.'
	},
	plan: {
		restart: 'restart',
		planningError: 'Omlouváme se, něco se pokazilo při plánování vaší cesty'
	},
	addMonument: {
		distanceBetweenMonumentsTooSmall:
			'Omlouváme se, nemůžete vytvořit svou památku zde, protože jsou památky, které jsou příliš blízko k vaší. Vyberte prosím jiné místo pro svou památku nebo nás kontaktujte.',
		markHere: 'označit zde',
		detail: {
			monumentCreated: 'Vaše památka byla úspěšně vytvořena.',
			monumentCreateError: 'Vaše památka nebyla úspěšně vytvořena. Zkuste to znovu.',
			create: 'vytvořit'
		}
	},
	globalError: {
		title: 'Omlouváme se, došlo k nepředvídatelné chybě',
		reloadButtonLabel: 'zkusit to znovu'
	}
} satisfies BaseTranslation;
