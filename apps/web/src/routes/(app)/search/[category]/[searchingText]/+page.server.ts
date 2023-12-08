import type { PageServerLoad } from './$types';
import type { Category } from './types';

export const load: PageServerLoad = async (event) => {
	return {
		search: {
			/**maximal number of results that will be loaded in one search*/
			resultLimit: 1,
			category: event.params.category as Category,
			searchingText: event.params.searchingText === '*' ? '' : event.params.searchingText
		}
	} as const;
};

export const ssr = false;
