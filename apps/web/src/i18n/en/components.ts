import type { BaseTranslation } from '../i18n-types';

export const componentsEN = {
	EmailInput: {
		label: 'Enter email'
	},
	PasswordInput: {
		label: 'Enter password'
	},
	UsernameInput: {
		label: 'Enter your name'
	},
	EmailSent: {
		title: 'We sent you email confirmation.',
		text: 'Open your email and click on the address we sent you. Open the verification URL only in the same browser of the same device that you registered the user! It is really necessary!'
	},
	MyIdInput: {
		label: 'Enter your custom Tourmate ID'
	},

	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel:
			'Do you really want to delete your experience? There is no way to get it back.',
		pictureAlreadyTaken: 'Picture already taken'
	},
	LogOutButton: {
		label: 'Log out'
	},
	MapSettings: {
		saveErrorMessage:
			'We are sorry, but your map preferences were not saved. Please try again later.',
		mapRange: 'Range of the map',
		exceededMaxRange: 'We are sorry, but you have to choose a smaller map range'
	},
	NoContent: {
		notFound: 'Nothing found here'
	},
	MeasureDistancesMap: {
		resetButtonLabel: 'Reset'
	},
	MonumentCreateForm: {
		monumentName: 'experience name',
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
			"We are sorry, you can't edit your question in the experience because some people could have already answered."
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
		cantFindAnyMonumentQuestion: "Can't find any experience?",
		noMonumentHere: 'Aj, aj, no experience is here...',
		createNewOneMessage:
			"If you can't choose from experiences that are shown on the map, you can create your own.",
		noMonumentsHereMessage:
			'You are in an area where there are no experiences you can connect with. You will have to wait until someone creates a new experience in your area, or you can create your own experience.'
	},
	CreateNewMonumentButton: {
		label: 'Create a new experience'
	},
	AnswerQuestionDrawer: {
		answer: 'Answer',
		notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this experience'
	},
	QuestionAnsweredWrongCard: {
		title: 'You answered the question wrong',
		notAbleToTakeAPictureWithTheMonument: 'You are not able to take a picture with this experience'
	},
	QuestionAnsweredCorrectlyCard: {
		title: 'Congratulations for answering the question correctly',
		nowYouCanTakePictureWithTheMonument: 'Now you can take a picture with this experience'
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
		newMonumentWasAdded: 'New experience was added'
	},
	UserMarker: {
		you: 'You'
	},
	MoreInformationButton: {
		label: 'See more information'
	},
	ExperienceCardComponent: {
		monumentThatWasConnectedToTheExperienceWasDeleted:
			'Experience that was connected to the picture was deleted',
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
	},
	Tutorial: {
		title: 'Tutorial',
		closeButtonLabel: 'Got it'
	},
	WhatAppOffersButton: {
		label: 'What Tourmate offers you'
	},
	CheckpointsSaveDrawer: {
		nameInput: {
			label: 'name of the tour'
		}
	},
	TourCheckpointAccomplishment: {
		title: 'This is the nearest checkpoint that you have to achieve',
		distanceToIs:
			'Distance to this checkpoint is: {distance: string}, you have to reach at least: {distanceToReach: string}. After completing the experience will be automatically accomplished by you withou a picture.'
	},
	ButtonCreateTour: {
		label: 'Create a new tour'
	},
	TourCardComponent: {
		shareTour: {
			title: 'Try out this tour'
		}
	},
	SystemDownAlert: {
		title: 'We are sorry, our systems are temporarily do',
		message: 'We are working on it',
		donationAsking: 'You can support us by donating, so we could buy a better server'
	},
	GPSOffAlert: {
		title: 'Your GPS is offline',
		message:
			'your GPS is offline or you did not granded a permission to use your GPS to chrome or safari browser. If geolocation is granted and nothing changed, try to move to receive location.'
	},
	ButtonLinkToDeveloperPage: {
		label: 'Developer and founder'
	},
	ButtonCreateAnonymousSession: {
		label: 'Continue in anonymous (experimental)',
		warningPopup: {
			message:
				'If you continue with anonymous session, you will not be able to recover your account. Please select a normal way to sign in.',
			iRead: 'I read'
		}
	}
} satisfies BaseTranslation;
