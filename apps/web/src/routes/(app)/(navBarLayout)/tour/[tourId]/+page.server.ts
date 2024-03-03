import { sdkssr } from '$src/graphql/sdkssr';
import { minimalRangeInMetersToConnectMonumentToPicture } from '../../createNewExperience/[lat]-[lng]/options';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const tourInfo = (await sdkssr(event).getTour({ tourId: event.params.tourId })).getTour;

	return {
		minimalDistanceToAccomplishMonument: minimalRangeInMetersToConnectMonumentToPicture,
		tour: tourInfo
	};
};
