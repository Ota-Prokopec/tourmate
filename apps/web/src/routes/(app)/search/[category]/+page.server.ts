import { sdkssr } from '$src/graphql/sdkssr';
import type { PageServerLoad } from './$types';
import type { Category } from './types';

export const load: PageServerLoad = async (event) => {
	return {
		search: {
			category: event.params.category as Category
		}
	} as const;
};
