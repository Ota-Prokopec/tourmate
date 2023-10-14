import type { PageServerLoad } from './$types';
import type { Category } from './types';

export const load: PageServerLoad = async (event) => {
	return {
		search: {
			category: event.params.category as Category,
			searchingText: event.params.searchingText
		}
	} as const;
};
