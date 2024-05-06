import { tourmateOptions } from '$lib/options';
import { sdkssr } from '$src/graphql/sdkssr';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		minimalDistanceToAccomplishMonument:
			tourmateOptions.minimalRangeInMetersToConnectMonumentToPicture,
		tourId: event.params.tourId
	};
};
