import type { BaseTranslation } from '../i18n-types';

export const errorsCS = {
	unexpectedError: 'Došlo k neočekávané chybě, prosím, sdílejte to s týmem podpory',
	accountNotFound: 'Účet nenalezen',
	addLikeError: 'Váš like nebyl zaznamenán.',
	removeLikeError: 'Nemohli jsme odstranit váš like.',
	deleteErrorMessage: '{what: string} nebylo smazáno, zkuste to znovu.',
	monumentLoadErrorMessage: 'Nemohli jsme načíst památky, zkuste to znovu.',
	notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage:
		'Omlouváme se, ale nemůžete vytvořit svoji památku zde, protože jsou památky, které jsou příliš blízko k té vaší. Prosím, vyberte jiné místo pro svoji památku nebo nás kontaktujte.',
	locationNowFoundErrorMessage:
		'Omlouváme se, ale vaše poloha nemohla být načtena. Vraťte se zpět a zkuste to znovu.',
	universalErrorMessage: 'Něco šlo špatně, zkuste to znovu nebo informujte naši podporu.'
} satisfies BaseTranslation;
