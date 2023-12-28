import type { PageServerLoad } from './[category]/[searchingText]/$types';
import { isCategory, type Category } from './types';

export const load: PageServerLoad = async (event) => {
	let chosenCategory = event.url.searchParams.get('chosenCategory');

	if (!isCategory(chosenCategory)) chosenCategory = 'places'; //the default category
	if (!isCategory(chosenCategory)) throw new Error('Invalid chosen category');

	return {
		search: {
			/**maximal number of results that will be loaded in one search*/
			resultLimit: 10,
			category: chosenCategory
		}
	} as const;
};

export const ssr = false;
