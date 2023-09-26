// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ parent }: Parameters<PageServerLoad>[0]) => {
	return { ...(await parent()) };
};
