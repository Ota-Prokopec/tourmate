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
	}
} satisfies BaseTranslation;
