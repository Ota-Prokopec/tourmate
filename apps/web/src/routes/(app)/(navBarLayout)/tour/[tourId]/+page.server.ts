import { sdkssr } from '$src/graphql/sdkssr';
import { minimalRangeInMetersToConnectMonumentToPicture } from '../../createNewExperience/[lat]-[lng]/options';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		minimalDistanceToAccomplishMonument: minimalRangeInMetersToConnectMonumentToPicture,
		tourId: event.params.tourId
	};
};
