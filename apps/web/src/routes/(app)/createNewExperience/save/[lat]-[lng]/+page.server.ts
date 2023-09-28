import { getPlaceDetailsByLatAndLong } from '@app/utils';
import { PageServerLoad } from './$types';
import { Location } from '@app/ts-types';

export const load: PageServerLoad = async (event) => {
	const placeDetail = await getPlaceDetailsByLatAndLong(
		parseInt(event.params.lat),
		parseInt(event.params.lng)
	);

	return {
		newExperience: {
			placeName: placeDetail.name,
			location: [parseInt(event.params.lat), parseInt(event.params.lng)] as Location
		}
	};
};
