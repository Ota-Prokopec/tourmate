import mapTiler from '$lib/utils/mapTiler';
import { isLocation } from '@app/utils';
import { PageServerLoad } from './$types';
import { Location } from '@app/ts-types';

export const load: PageServerLoad = async (event) => {
	const location = [JSON.parse(event.params.lat), JSON.parse(event.params.lng)];

	if (!isLocation(location)) throw new Error('Invalid location');
	const [placeDetail] = await mapTiler.reverseGeocoding(...location, {});

	return {
		newExperience: {
			placeName: placeDetail.place_name,
			location: [JSON.parse(event.params.lat), JSON.parse(event.params.lng)] as Location
		}
	};
};
