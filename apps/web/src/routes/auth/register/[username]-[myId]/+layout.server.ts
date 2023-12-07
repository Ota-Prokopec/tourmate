import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
	return {
		params: { username: event.params.username, myId: event.params.myId }
	};
};
