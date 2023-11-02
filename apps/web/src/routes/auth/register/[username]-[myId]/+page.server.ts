import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	return {
		params: { username: event.params.username, myId: event.params.myId }
	};
};
