import type { BaseTranslation } from '../i18n-types';
import { commonEN } from './common';
import { pageEN } from './page';

export const errorsEN = {
	unexpectedError: 'unexpected error has occurred, please share this with the support team',
	accountNotFound: 'Account not found',
	addLikeError: 'Your like was not recorded.',
	removeLikeError: 'We could not remove your like.',
	deleteErrorMessage: '{what: string} was not deleted, please try it again.',
	monumentLoadErrorMessage: 'We could not load monuments, please try again.',
	notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage:
		'We are sorry, but you cant create your monument here, because there are monuments that are too close to yours. Please choose another place for your monument or contact us.',
	locationNowFoundErrorMessage:
		'We are sorry but your location could not be loaded. Please return back and try it again.'
} satisfies BaseTranslation;
