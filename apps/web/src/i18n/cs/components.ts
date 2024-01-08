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
		title: 'Poslali jsme vám potvrzení e-mailem.',
		text: 'Otevřete svůj e-mail a klikněte na odkaz, který jsme vám poslali.'
	},
	MyIdInput: {
		label: 'zadejte své ID'
	},
	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel: 'Opravdu chcete smazat svoji památku? Nelze ji obnovit.',
		pictureAlreadyTaken: 'Obrázek již byl pořízen'
	},
	LogOutButton: {
		label: 'odhlásit se'
	},
	MapSettings: {
		saveErrorMessage:
			'Omlouváme se, ale vaše preference mapy nebyly uloženy. Zkuste to později znovu.',
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
		about: 'o zážitku',
		image: 'obrázek'
	},
	AddQuestionDrawer: {
		saveError: 'Nemůžeme uložit vaši otázku takto, zkontrolujte, zda je vše vyplněno.',
		yourQuestion: 'Vaše otázka',
		save: 'uložit',
		questionTypes: {
			radio: 'výběr',
			text: 'text',
			number: 'číslo'
		}
	},
	AddQuestionButton: {
		label: 'přidat svou otázku',
		notAbleToEditQuestion:
			'Omlouváme se, nemůžete upravit svou otázku v památce, protože již někteří lidé mohli odpovědět.'
	},
	ImageInput: {
		throughGallery: 'přes galerii',
		throughClipboard: 'přes schránku',
		clipboardNotFound: 'V schránce není k dispozici žádný obrázek.'
	},
	CookiesAlert: {
		title:
			'Tato stránka používá soubory cookie k ukládání relací uživatelů a dat uživatelů, včetně aktuální polohy uživatelů.',
		acceptButtonLabel: 'přijmout soubory cookie'
	},
	SeeOnMapButton: {
		label: 'zobrazit na mapě'
	},
	SeeMapButton: {
		label: 'zobrazit mapu'
	},
	SeeOnGoogleMapsButton: {
		label: 'zobrazit na Google Maps'
	},
	TakePictureHereButton: {
		label: 'pořídit obrázek zde'
	},
	ContinueButton: {
		label: 'pokračovat'
	},
	MonumentNotFoundDrawer: {
		cantFindAnyMonumentQuestion: 'Nemůžete najít žádnou památku?',
		noMonumentHere: 'Aj, aj, žádná památka tady není...',
		createNewOneMessage:
			'Pokud nemůžete vybrat z památek, které jsou viditelné na mapě, můžete vytvořit vlastní.',
		noMonumentsHereMessage:
			'Nacházíte se v oblasti, kde nejsou žádné památky, ke kterým byste se mohli připojit. Budete muset počkat, dokud někdo vytvoří novou památku ve vaší oblasti, nebo si můžete vytvořit vlastní památku.'
	},
	CreateNewMonumentButton: {
		label: 'vytvořit novou památku'
	},
	AnswerQuestionDrawer: {
		answer: 'odpovědět',
		notAbleToTakeAPictureWithTheMonument: 'Nemůžete pořídit obrázek s touto památkou'
	},
	QuestionAnsweredWrongCard: {
		title: 'Odpověděli jste špatně na otázku',
		notAbleToTakeAPictureWithTheMonument: 'Nemůžete pořídit obrázek s touto památkou'
	},
	QuestionAnsweredCorrectlyCard: {
		title: 'Gratulujeme k správné odpovědi na otázku',
		nowYouCanTakePictureWithTheMonument: 'Nyní můžete pořídit obrázek s touto památkou'
	},
	SetLocationForNotificationsPage: {
		errorMessage: 'Nepodařilo se nastavit vaši polohu pro oznámení',
		yourLocationIsCurrently_InRangeOf_:
			'vaše poloha je aktuálně {location: number[]} v rozsahu {range: string}',
		chooseYourLocationForNotifications: 'vyberte si polohu pro oznámení',
		cancel: 'zrušit',
		save: 'uložit'
	},
	CreateYourFirstPictureButton: {
		label: 'Vytvořte svůj první obrázek'
	},
	CreateYourFirstMonumentButton: {
		label: 'Vytvořte svou první památku'
	},
	FirebaseMonumentNotification: {
		newMonumentWasAdded: 'Byla přidána nová památka'
	},
	UserMarker: {
		you: 'vy'
	},
	MoreInformationButton: {
		label: 'zobrazit více informací'
	},
	ExperienceCardComponent: {
		monumentThatWasConnectedToTheExperienceWasDeleted:
			'Památka, která byla spojena s touto zkušeností, byla smazána',
		reallyDeleteYourExperienceQuestion: 'Opravdu chcete smazat svůj obrázek? Nelze ho obnovit.'
	},
	CancelButton: {
		label: 'zrušit'
	},
	BasicImageInput: {
		title: 'Klikněte pro nahrání nebo přetáhněte soubor sem'
	},
	InstallApp: {
		title: 'Nainstalujte aplikaci Tourmate',
		text: 'Nainstalujte naši aplikaci Tourmate pro lepší zážitek',
		installButtonLabel: 'nainstalovat',
		useChrome: 'nebo použijte naší webovou verzi'
	}
} satisfies BaseTranslation;
