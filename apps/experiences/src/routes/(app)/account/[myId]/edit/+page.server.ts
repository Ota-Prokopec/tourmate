import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	return { ...(await parent()) };
};
