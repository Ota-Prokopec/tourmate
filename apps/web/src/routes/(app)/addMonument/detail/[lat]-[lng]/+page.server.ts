import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import { getPlaceDetailsByLatAndLong } from '@app/utils';

export const load: PageServerLoad = async (event) => {
	const location = [event.params.lat, event.params.lng].map((p) => parseInt(p)) as Location;

	const getPlaceDetailsNoDatabasePromise = getPlaceDetailsByLatAndLong(location[0], location[1]);

	const [{ name: placeName }] = await Promise.all([getPlaceDetailsNoDatabasePromise]);
	return {
		newMonument: { location, placeName }
	};
};
