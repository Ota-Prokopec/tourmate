import type { BaseTranslation } from '../i18n-types';
import { componentsEN } from './components';
import { commonEN } from './common';
import { errorsEN } from './errors';
import { pageEN } from './page';

const en = {
	page: pageEN,
	common: commonEN,
	component: componentsEN,
	error: errorsEN
} satisfies BaseTranslation;

export default en;
