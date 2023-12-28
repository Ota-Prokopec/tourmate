import type { BaseTranslation } from '../i18n-types';
import { commonEN } from './common';
import { pageEN } from './page';

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
	EditProfileButton: {
		label: 'edit profile'
	},
	MonumentCardComponent: {
		reallyDeleteTheMonumentLabel:
			'Do you really want to delete your monument, there is no way to get it back.',
		seeOnGoogleMaps: 'see on google maps',
		seeMore: 'see more information',
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
		about: 'about',
		image: 'image'
	},
	AddQuestionDrawer: {
		saveError:
			"'We are not able to save your question like this, please check if everything is filled up.",
		yourQuestion: 'Your question',
		save: 'save'
	},
	AddQuestionButton: {
		label: 'add your question'
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
	}
} satisfies BaseTranslation;
