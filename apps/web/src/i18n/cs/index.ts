import type { BaseTranslation } from '../i18n-types';
import { componentsCS } from './components';
import { commonCS } from './common';
import { errorsCS } from './errors';
import { pageCS } from './page';

const en = {
	page: pageCS,
	common: commonCS,
	component: componentsCS,
	error: errorsCS
} satisfies BaseTranslation;

export default en;
