// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = (event: Parameters<PageServerLoad>[0]) => {
	return {
		params: { username: event.params.username, myId: event.params.myId }
	};
};
