import { sdkssr } from '$src/graphql/sdkssr';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { myId } = event.params;
	const res = await sdkssr(event).getAccountByMyIdWithExperiencesAndMonuments({ myId: myId });
	return {
		userProfile: res.getAccountByMyId
	};
};
