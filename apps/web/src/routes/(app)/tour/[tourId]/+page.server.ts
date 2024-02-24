import { sdkssr } from '$src/graphql/sdkssr';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const tourInfo = await sdkssr(event).getTour({ tourId: event.params.tourId });
	return {
		tour: tourInfo
	};
};
