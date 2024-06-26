import type { PageServerLoad } from './$types';
import { isSearchCategory } from './types';

export const load: PageServerLoad = async (event) => {
	let chosenCategory = event.url.searchParams.get('chosenCategory');
	let searchingText = event.url.searchParams.get('searchingText') ?? '';

	if (!isSearchCategory(chosenCategory)) chosenCategory = 'places'; //the default category
	if (!isSearchCategory(chosenCategory)) throw new Error('Invalid chosen category');

	return {
		search: {
			/**maximal number of results that will be loaded in one search*/
			resultLimit: 5,
			category: chosenCategory,
			searchingText
		}
	} as const;
};

export const ssr = false;
