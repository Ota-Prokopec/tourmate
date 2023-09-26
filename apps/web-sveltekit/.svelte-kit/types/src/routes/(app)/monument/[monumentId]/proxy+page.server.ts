// @ts-nocheck
import type { PageServerLoad } from './$types';
import { sdkssr } from '$src/graphql/sdkssr';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
	const { monumentId } = event.params;

	const monument = (
		await sdkssr(event).getMonumentWithCreatorAndNearestListOfExperience({
			id: monumentId
		})
	).getMonument;

	return {
		monument
	};
};
