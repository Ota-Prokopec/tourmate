import type { BaseTranslation } from '../i18n-types';

export const componentsCS = {
	EmailInput: {
		label: 'Zadejte e-mail'
	},
	PasswordInput: {
		label: 'Zadejte heslo'
	},
	UsernameInput: {
		label: 'Zadejte své jméno'
	},
	EmailSent: {
		title: 'Poslali jsme vám potvrzení e-mailem.',
		text: 'Otevřete svůj e-mail a klikněte na odkaz, který jsme vám poslali. Ověřovací adresu URL otevřete pouze ve stejném prohlížeči na stejném zařízení, na kterém jste uživatele zaregistrovali!'
	},
	MyIdInput: {
		label: 'Zadejte své vlastní Tourmate ID'
	},
	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel: 'Opravdu chcete smazat svůj zážitek? Nelze ji obnovit.',
		pictureAlreadyTaken: 'Obrázek již byl pořízen'
	},
	LogOutButton: {
		label: 'Odhlásit se'
	},
	MapSettings: {
		saveErrorMessage:
			'Omlouváme se, ale vaše preference mapy nebyly uloženy. Zkuste to později znovu.',
		mapRange: 'Rozsah mapy',
		exceededMaxRange: 'We are sorry, but you have to choose a smaller map range'
	},
	NoContent: {
		notFound: 'Nic nenalezeno'
	},
	MeasureDistancesMap: {
		resetButtonLabel: 'Resetovat'
	},
	MonumentCreateForm: {
		monumentName: 'Název zážitku',
		place: 'Místo',
		type: 'Typ',
		transport: 'Doprava',
		about: 'O zážitku',
		image: 'Obrázek'
	},
	AddQuestionDrawer: {
		saveError: 'Nemůžeme uložit vaši otázku takto, zkontrolujte, zda je vše vyplněno.',
		yourQuestion: 'Vaše otázka',
		save: 'Uložit',
		questionTypes: {
			radio: 'Výběr',
			text: 'Text',
			number: 'Číslo'
		}
	},
	AddQuestionButton: {
		label: 'Přidat svou otázku',
		notAbleToEditQuestion:
			'Omlouváme se, nemůžete upravit svou otázku v zážitku, protože již někteří lidé mohli odpovědět.'
	},
	ImageInput: {
		throughGallery: 'Přes galerii',
		throughClipboard: 'Přes schránku',
		clipboardNotFound: 'V schránce není k dispozici žádný obrázek.'
	},
	CookiesAlert: {
		title:
			'Tato stránka používá soubory cookie k ukládání relací uživatelů a dat uživatelů, včetně aktuální polohy uživatelů.',
		acceptButtonLabel: 'Přijmout soubory cookie'
	},
	SeeOnMapButton: {
		label: 'Zobrazit na mapě'
	},
	SeeMapButton: {
		label: 'Zobrazit mapu'
	},
	SeeOnGoogleMapsButton: {
		label: 'Zobrazit na Google Maps'
	},
	TakePictureHereButton: {
		label: 'Pořídit obrázek zde'
	},
	ContinueButton: {
		label: 'Pokračovat'
	},
	MonumentNotFoundDrawer: {
		cantFindAnyMonumentQuestion: 'Nemůžete najít žádný zážitek?',
		noMonumentHere: 'Aj, aj, žádný zážitek tu poblíž není...',
		createNewOneMessage:
			'Pokud si nemůžete vybrat ze zážitků, které jsou viditelné na mapě, můžete vytvořit vlastní.',
		noMonumentsHereMessage:
			'Nacházíte se v oblasti, kde nejsou žádné zážitky, ke kterým byste se mohli připojit. Budete muset počkat, dokud někdo vytvoří nový zážitek ve vaší oblasti, nebo si můžete vytvořit vlastní zážitek.'
	},
	CreateNewMonumentButton: {
		label: 'Vytvořit nový zážitek'
	},
	AnswerQuestionDrawer: {
		answer: 'Odpovědět',
		notAbleToTakeAPictureWithTheMonument: 'Nemůžete pořídit obrázek s tímto zážitkem'
	},
	QuestionAnsweredWrongCard: {
		title: 'Odpověděli jste špatně na otázku',
		notAbleToTakeAPictureWithTheMonument: 'Nemůžete pořídit obrázek s tímto zážitkem'
	},
	QuestionAnsweredCorrectlyCard: {
		title: 'Gratulujeme k správné odpovědi na otázku',
		nowYouCanTakePictureWithTheMonument: 'Nyní můžete pořídit obrázek s tímto zážitkem'
	},
	SetLocationForNotificationsPage: {
		errorMessage: 'Nepodařilo se nastavit vaši polohu pro oznámení',
		yourLocationIsCurrently_InRangeOf:
			'Vaše poloha je aktuálně {location: number[]} v rozsahu {range: string}',
		chooseYourLocationForNotifications: 'Vyberte si polohu pro oznámení',
		cancel: 'Zrušit',
		save: 'Uložit',
		help: 'Když lidé vytvoří nový zážitek a přihlásíte se k místu, kde bude tento zážitek umístěn, budete o tomto novém zážitku informováni.'
	},
	CreateYourFirstPictureButton: {
		label: 'Vytvořte svůj první obrázek'
	},
	CreateYourFirstMonumentButton: {
		label: 'Vytvořte svou první památku'
	},
	FirebaseMonumentNotification: {
		newMonumentWasAdded: 'Byla přidán nový zážitek'
	},
	UserMarker: {
		you: 'Vy'
	},
	MoreInformationButton: {
		label: 'Zobrazit více informací'
	},
	ExperienceCardComponent: {
		monumentThatWasConnectedToTheExperienceWasDeleted:
			'Zážitek, který byl spojen s touto fotkou, byl smazán',
		reallyDeleteYourExperienceQuestion: 'Opravdu chcete smazat svůj obrázek? Nelze ho obnovit.'
	},
	CancelButton: {
		label: 'Zrušit'
	},
	BasicImageInput: {
		title: 'Klikněte pro nahrání nebo přetáhněte soubor sem'
	},
	InstallApp: {
		title: 'Nainstalujte aplikaci Tourmate',
		text: 'Nainstalujte naši aplikaci Tourmate pro lepší zážitek',
		installButtonLabel: 'Nainstalovat',
		useChrome: 'Nebo použijte naší webovou verzi'
	},
	Tutorial: {
		title: 'Tutoriál',
		closeButtonLabel: 'Mám to'
	},
	WhatAppOffersButton: {
		label: 'Co vám Tourmate nabízí'
	},
	CheckpointsSaveDrawer: {
		nameInput: {
			label: 'jméno trasy'
		}
	},
	TourCheckpointAccomplishment: {
		title: 'Toto je nejbližší kontrolní místo, kterého musíte dosáhnout.',
		distanceToIs:
			'Vzdálenost k tomuto kontrolnímu bodu je: {distance: string}, musíte dosáhnout alespoň: {distanceToReach: string}. Po dosažení se zážitek automaticky splní bez udané fotograrie.'
	},
	ButtonCreateTour: {
		label: 'Vytvoř túru'
	}
} satisfies BaseTranslation;
