// @ts-nocheck
import { sdkssr } from '$src/graphql/sdkssr';
import type { LayoutServerLoad } from './$types';

export const load = async (event: Parameters<LayoutServerLoad>[0]) => {
	const { myId } = event.params;
	const res = await sdkssr(event).getAccountByMyIdWithExperiencesAndMonuments({ myId: myId });
	return {
		userProfile: res.getAccountByMyId
	};
};
