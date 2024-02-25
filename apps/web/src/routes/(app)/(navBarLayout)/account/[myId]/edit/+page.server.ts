import { sdkssr } from '$src/graphql/sdkssr';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const profilePromise = sdkssr(event).getProfile({ myId: event.params.myId });
	const res = await profilePromise;
	return {
		userProfile: res.getUser
	};
};
