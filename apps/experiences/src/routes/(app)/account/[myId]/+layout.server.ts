import { trpc } from '$lib/trpc';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { myId } = event.params;
	return {
		userProfile: await trpc(event).profile.getProfileByMyId.query({ myId }),
		usersExperiences: await trpc(event).experience.getListByUserByMyId.query({ myId })
	};
};
