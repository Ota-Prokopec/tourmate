import { trpc } from '$lib/trpc';

export const load = async (event) => {
	const experiences = await trpc(event).experience.getListByLocation.query({
		location: [49.3454375, 14.2127524],
		zoom: 14
	});
	return { loadedExperiences: experiences };
};
