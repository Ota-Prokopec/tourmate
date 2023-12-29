import type { BaseTranslation } from '../i18n-types';

export const componentsCS = {
	EmailInput: {
		label: 'zadejte e-mail'
	},
	PasswordInput: {
		label: 'zadejte heslo'
	},
	UsernameInput: {
		label: 'zadejte uživatelské jméno'
	},
	EmailSent: {
		title: 'Poslali jsme vám potvrzovací e-mail.',
		text: 'Otevřete svůj e-mail a klikněte na odkaz, který jsme vám poslali.'
	},
	MyIdInput: {
		label: 'zadejte své ID'
	},
	EditProfileButton: {
		label: 'upravit profil'
	},
	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel: 'Opravdu chcete smazat svou památku? Nelze ji obnovit.',
		seeOnGoogleMaps: 'zobrazit na Google Maps',
		seeMore: 'zobrazit více informací',
		pictureAlreadyTaken: 'Obrázek již byl pořízen'
	},
	LogOutButton: {
		label: 'odhlásit se'
	},
	MapSettings: {
		saveErrorMessage:
			'Omlouváme se, ale vaše nastavení mapy nebylo uloženo. Zkuste to později znovu.',
		mapRange: 'rozsah mapy'
	},
	NoContent: {
		notFound: 'nenalezeno'
	},
	MeasureDistancesMap: {
		resetButtonLabel: 'resetovat'
	},
	MonumentCreateForm: {
		monumentName: 'název památky',
		place: 'místo',
		type: 'typ',
		transport: 'doprava',
		about: 'o památce',
		image: 'obrázek'
	},
	AddQuestionDrawer: {
		saveError: 'Nemůžeme uložit vaši otázku, zkontrolujte, zda je vše vyplněno správně.',
		yourQuestion: 'Vaše otázka',
		save: 'uložit'
	},
	AddQuestionButton: {
		label: 'přidat svou otázku'
	},
	ImageInput: {
		throughGallery: 'přes galerii',
		throughClipboard: 'přes schránku',
		clipboardNotFound: 'Ve vaší schránce není k dispozici žádný obrázek.'
	},
	CookiesAlert: {
		title:
			'Tato stránka používá soubory cookie ke ukládání relací uživatelů a dat uživatelů, včetně aktuální polohy uživatelů.',
		acceptButtonLabel: 'přijmout cookies'
	},
	MonumentCardSkeleton: {
		seeOnGoogleMaps: 'zobrazit na Google Maps',
		seeMore: 'zobrazit více informací'
	}
} satisfies BaseTranslation;
