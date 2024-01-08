import type { BaseTranslation } from '../i18n-types';

export const componentsEN = {
	EmailInput: {
		label: 'enter email'
	},
	PasswordInput: {
		label: 'enter password'
	},
	UsernameInput: {
		label: 'enter username'
	},
	EmailSent: {
		title: 'We sent you email confxirmation.',
		text: 'Open your email and click on address we sent you.'
	},
	MyIdInput: {
		label: 'enter your id'
	},

	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel:
			'Do you really want to delete your monument, there is no way to get it back.',
		pictureAlreadyTaken: 'Picture already taken'
	},
	LogOutButton: {
		label: 'log out'
	},
	MapSettings: {
		saveErrorMessage:
			'We are sorry, but your map preferences were not saved. Please try it later again.',
		mapRange: 'range of the map'
	},
	NoContent: {
		notFound: 'not found'
	},
	MeasureDistancesMap: {
		resetButtonLabel: 'reset'
	},
	MonumentCreateForm: {
		monumentName: 'monument name',
		place: 'place',
		type: 'type',
		transport: 'transport',
		about: 'about experience',
		image: 'image'
	},
	AddQuestionDrawer: {
		saveError:
			"'We are not able to save your question like this, please check if everything is filled up.",
		yourQuestion: 'Your question',
		save: 'save',
		questionTypes: {
			radio: 'choice',
			text: 'text',
			number: 'number'
		}
	},
	AddQuestionButton: {
		label: 'add your question',
		notAbleToEditQuestion:
			'We are sorry, you cant edit your question in monument, because some people could already answered.'
	},
	ImageInput: {
		throughGallery: 'through gallery',
		throughClipboard: 'through clipboard',
		clipboardNotFound: 'There is no picture available in your clipboard.'
	},
	CookiesAlert: {
		title:
			'This site uses cookies to store users sessions and users data including users current location.',
		acceptButtonLabel: 'accept cookies'
	},
	SeeOnMapButton: {
		label: 'see on map'
	},
	SeeMapButton: {
		label: 'see map'
	},
	SeeOnGoogleMapsButton: {
		label: 'see on google maps'
	},
	TakePictureHereButton: {
		label: 'take a picture here'
	},
	ContinueButton: {
		label: 'continue'
	},
	MonumentNotFoundDrawer: {
		cantFindAnyMonumentQuestion: "Can't find any monument?",
		noMonumentHere: 'Aj, aj no monument is here...',
		createNewOneMessage: 'If you cant choose from monuments that are screen on map you can create.',
		noMonumentsHereMessage:
			'You are in the area where are no monuments you could connect, you will have to wait till someone will create a new monument in your area or you can create your own monument.'
	},
	CreateNewMonumentButton: {
		label: 'create a new monument'
	},
	AnswerQuestionDrawer: {
		answer: 'answer',
		notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this monument'
	},
	QuestionAnsweredWrongCard: {
		title: 'You answered the question wrong',
		notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this monument'
	},
	QuestionAnsweredCorrectlyCard: {
		title: 'congratulation for the question answering correctly',
		nowYouCanTakePictureWithTheMonument: 'Now you can take a picture with this monument'
	},
	SetLocationForNotificationsPage: {
		errorMessage: 'It was not successful to set your location for notifications',
		yourLocationIsCurrently_InRangeOf_:
			'your location is currently {location: number[]} of range {range: string}',
		chooseYourLocationForNotifications: 'choose your location for notifications',
		cancel: 'cancel',
		save: 'save'
	},
	CreateYourFirstPictureButton: {
		label: 'Create your first picture'
	},
	CreateYourFirstMonumentButton: {
		label: 'Create your first experience'
	},
	FirebaseMonumentNotification: {
		newMonumentWasAdded: 'New monument was added'
	},
	UserMarker: {
		you: 'you'
	},
	MoreInformationButton: {
		label: 'see more information'
	},
	ExperienceCardComponent: {
		monumentThatWasConnectedToTheExperienceWasDeleted:
			'monument that was connected to the experience was deleted',
		reallyDeleteYourExperienceQuestion:
			'Do you really want to delete your picture? There is no way to get it back.'
	},
	CancelButton: {
		label: 'cancel'
	},
	BasicImageInput: {
		title: 'Click to upload or drag and drop'
	},
	InstallApp: {
		title: 'Install tourmate app',
		text: 'Install our tourmate app for better experience',
		installButtonLabel: 'install',
		useChrome: 'of use Chrome version'
	}
} satisfies BaseTranslation;
