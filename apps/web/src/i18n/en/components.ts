import type { BaseTranslation } from '../i18n-types';

export const componentsEN = {
	EmailInput: {
		label: 'Enter email'
	},
	PasswordInput: {
		label: 'Enter password'
	},
	UsernameInput: {
		label: 'Enter username'
	},
	EmailSent: {
		title: 'We sent you email confirmation.',
		text: 'Open your email and click on the address we sent you.'
	},
	MyIdInput: {
		label: 'Enter your ID'
	},

	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel:
			'Do you really want to delete your monument? There is no way to get it back.',
		pictureAlreadyTaken: 'Picture already taken'
	},
	LogOutButton: {
		label: 'Log out'
	},
	MapSettings: {
		saveErrorMessage:
			'We are sorry, but your map preferences were not saved. Please try again later.',
		mapRange: 'Range of the map'
	},
	NoContent: {
		notFound: 'Not found'
	},
	MeasureDistancesMap: {
		resetButtonLabel: 'Reset'
	},
	MonumentCreateForm: {
		monumentName: 'Monument name',
		place: 'Place',
		type: 'Type',
		transport: 'Transport',
		about: 'About experience',
		image: 'Image'
	},
	AddQuestionDrawer: {
		saveError:
			'We are not able to save your question like this, please check if everything is filled up.',
		yourQuestion: 'Your question',
		save: 'Save',
		questionTypes: {
			radio: 'Choice',
			text: 'Text',
			number: 'Number'
		}
	},
	AddQuestionButton: {
		label: 'Add your question',
		notAbleToEditQuestion:
			"We are sorry, you can't edit your question in the monument because some people could have already answered."
	},
	ImageInput: {
		throughGallery: 'Through gallery',
		throughClipboard: 'Through clipboard',
		clipboardNotFound: 'There is no picture available in your clipboard.'
	},
	CookiesAlert: {
		title:
			"This site uses cookies to store users' sessions and users' data, including users' current location.",
		acceptButtonLabel: 'Accept cookies'
	},
	SeeOnMapButton: {
		label: 'See on map'
	},
	SeeMapButton: {
		label: 'See map'
	},
	SeeOnGoogleMapsButton: {
		label: 'See on Google Maps'
	},
	TakePictureHereButton: {
		label: 'Take a picture here'
	},
	ContinueButton: {
		label: 'Continue'
	},
	MonumentNotFoundDrawer: {
		cantFindAnyMonumentQuestion: "Can't find any monument?",
		noMonumentHere: 'Aj, aj, no monument is here...',
		createNewOneMessage:
			"If you can't choose from monuments that are shown on the map, you can create your own.",
		noMonumentsHereMessage:
			'You are in an area where there are no monuments you can connect with. You will have to wait until someone creates a new monument in your area, or you can create your own monument.'
	},
	CreateNewMonumentButton: {
		label: 'Create a new monument'
	},
	AnswerQuestionDrawer: {
		answer: 'Answer',
		notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this monument'
	},
	QuestionAnsweredWrongCard: {
		title: 'You answered the question wrong',
		notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this monument'
	},
	QuestionAnsweredCorrectlyCard: {
		title: 'Congratulations for answering the question correctly',
		nowYouCanTakePictureWithTheMonument: 'Now you can take a picture with this monument'
	},
	SetLocationForNotificationsPage: {
		errorMessage: 'It was not successful to set your location for notifications',
		yourLocationIsCurrently_InRangeOf_:
			'Your location is currently {location: number[]} of range {range: string}',
		chooseYourLocationForNotifications: 'Choose your location for notifications',
		cancel: 'Cancel',
		save: 'Save',
		help: 'When people create a new experience and you subscribe to that place where the experience will be placed, you will be notified about this new experience.'
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
		you: 'You'
	},
	MoreInformationButton: {
		label: 'See more information'
	},
	ExperienceCardComponent: {
		monumentThatWasConnectedToTheExperienceWasDeleted:
			'Monument that was connected to the experience was deleted',
		reallyDeleteYourExperienceQuestion:
			'Do you really want to delete your picture? There is no way to get it back.'
	},
	CancelButton: {
		label: 'Cancel'
	},
	BasicImageInput: {
		title: 'Click to upload or drag and drop'
	},
	InstallApp: {
		title: 'Install Tourmate app',
		text: 'Install our Tourmate app for a better experience',
		installButtonLabel: 'Install',
		useChrome: 'or use Chrome version'
	}
} satisfies BaseTranslation;
