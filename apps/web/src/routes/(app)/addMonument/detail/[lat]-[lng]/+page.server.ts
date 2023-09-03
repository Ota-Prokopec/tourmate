import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import { getDetailsByLatAndLong } from '@app/utils';
import { numberTimingCoords } from '@app/experience-database-server';
import { trpc } from '$lib/trpc';

export const load: PageServerLoad = async (event) => {
	const location = [event.params.lat, event.params.lng].map(
		(p) => parseInt(p) / numberTimingCoords
	) as Location;

	const [{ name: placeName }, monuments] = await Promise.all([
		getDetailsByLatAndLong(location[0], location[1]),
		await trpc(event).experience.monument.getListByLocation.query({
			location: location,
			zoom: 14
		})
	]);
	return {
		newMonument: { location, placeName },
		monuments
	};
};
