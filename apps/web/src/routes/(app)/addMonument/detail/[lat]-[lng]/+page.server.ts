import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import { getDetailsByLatAndLong } from '@app/utils';
import { numberTimingCoords } from '@app/experience-settings';
import { sdkssr } from '$src/graphql/sdkssr';

export const load: PageServerLoad = async (event) => {
	const location = [event.params.lat, event.params.lng].map(
		(p) => parseInt(p) / numberTimingCoords
	) as Location;

	const listOfMonumentsPromise = sdkssr(event).getListOfMonumentsWithCreatorAndNearestExperiences({
		input: {
			location: location,
			zoom: 14
		}
	});

	const getPlaceDetailsNoDatabasePromise = getDetailsByLatAndLong(location[0], location[1]);

	const [{ name: placeName }, { getListOfMonuments: listOfMonuments }] = await Promise.all([
		getPlaceDetailsNoDatabasePromise,
		listOfMonumentsPromise
	]);
	return {
		newMonument: { location, placeName },
		monuments: listOfMonuments
	};
};
