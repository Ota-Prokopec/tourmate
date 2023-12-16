import { sdkssr } from '$src/graphql/sdkssr';
import { LayoutServerLoad } from './$types';

export const ssr = false;

export const load: LayoutServerLoad = async (event) => {
	const { myId } = event.params;

	const usersProfile = (await sdkssr(event).getProfile({ myId: myId })).getUser;
	return {
		usersProfile,
		props: {
			myId
		}
	};
	// const profilePromise = sdkssr(event).getProfile({ myId: myId });
	// const res = await profilePromise;
	// return {
	// 	userProfile: res.getUser
	// };
};
