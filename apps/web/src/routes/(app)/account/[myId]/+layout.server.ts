import { sdkssr } from '$src/graphql/sdkssr';
import { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { myId } = event.params;
	const profilePromise = sdkssr(event).getProfile({ myId: myId });
	const res = await profilePromise;
	return {
		userProfile: res.getUser
	};
};
