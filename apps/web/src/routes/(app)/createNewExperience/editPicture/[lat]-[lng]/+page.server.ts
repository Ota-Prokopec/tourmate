import mapTiler from '$lib/utils/mapTiler';
import { PageServerLoad } from './$types';
import { Location } from '@app/ts-types';

export const load: PageServerLoad = async (event) => {
	const [placeDetail] = await mapTiler.reverseGeocoding(
		JSON.parse(event.params.lat),
		JSON.parse(event.params.lng),
		{}
	);

	return {
		newExperience: {
			placeName: placeDetail.place_name,
			location: [parseInt(event.params.lat), parseInt(event.params.lng)] as Location
		}
	};
};
