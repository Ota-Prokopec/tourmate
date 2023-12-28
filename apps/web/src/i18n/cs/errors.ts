import type { BaseTranslation } from '../i18n-types';

export const errorsCS = {
	unexpectedError: 'Došlo k neočekávané chybě, prosím, sdílejte to s týmem podpory.',
	accountNotFound: 'Účet nenalezen',
	addLikeError: 'Váš like nebyl zaznamenán.',
	removeLikeError: 'Nepodařilo se odebrat váš like.',
	deleteErrorMessage: '{what: string} nebylo smazáno, zkuste to prosím znovu.',
	monumentLoadErrorMessage: 'Nepodařilo se načíst památky, zkuste to znovu.'
} satisfies BaseTranslation;
