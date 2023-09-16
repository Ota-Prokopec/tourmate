import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import { getDetailsByLatAndLong } from '@app/utils';
import { numberTimingCoords } from '@app/experience-settings';

export const load: PageServerLoad = async (event) => {
	const location = [event.params.lat, event.params.lng].map(
		(p) => parseInt(p) / numberTimingCoords
	) as Location;

	const getPlaceDetailsNoDatabasePromise = getDetailsByLatAndLong(location[0], location[1]);

	const [{ name: placeName }] = await Promise.all([getPlaceDetailsNoDatabasePromise]);
	return {
		newMonument: { location, placeName }
	};
};
