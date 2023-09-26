// @ts-nocheck
import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import { getDetailsByLatAndLong } from '@app/utils';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
	const location = [event.params.lat, event.params.lng].map((p) => parseInt(p)) as Location;

	const getPlaceDetailsNoDatabasePromise = getDetailsByLatAndLong(location[0], location[1]);

	const [{ name: placeName }] = await Promise.all([getPlaceDetailsNoDatabasePromise]);
	return {
		newMonument: { location, placeName }
	};
};
