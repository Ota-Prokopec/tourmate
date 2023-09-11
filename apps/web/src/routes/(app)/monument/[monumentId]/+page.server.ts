import type { PageServerLoad } from './$types';
import { sdkssr } from '$src/graphql/sdkssr';

export const load: PageServerLoad = async (event) => {
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
