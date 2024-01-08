import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import mapTiler from '$lib/utils/mapTiler';

export const load: PageServerLoad = async (event) => {
	const location = [event.params.lat, event.params.lng].map((p) => JSON.parse(p)) as Location;

	const getPlaceDetailsNoDatabasePromise = mapTiler.reverseGeocoding(location[0], location[1], {
		limit: 1
	});

	const place_name = (await Promise.all([getPlaceDetailsNoDatabasePromise]))
		.at(0)
		?.at(0)?.place_name;
	return {
		newMonument: { location, placeName: place_name ?? '' }
	};
};
