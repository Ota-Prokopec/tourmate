import mapTiler from '$lib/utils/mapTiler';
import { isLocation, metersToDegree } from '@app/utils';
import { PageServerLoad } from './$types';
import { sdkssr } from '$src/graphql/sdkssr';
import { maximalRangeInMetersToConnectMonumentToPicture } from './options';

export const ssr = false;

export const load: PageServerLoad = async (event) => {
	const location = [JSON.parse(event.params.lat), JSON.parse(event.params.lng)];

	if (!isLocation(location)) throw new Error('Invalid location param in url');

	const nearMonumentsPromise = sdkssr(event).getListOfMonumentsForMap({
		location: {
			location: location,
			rangeMeters: maximalRangeInMetersToConnectMonumentToPicture * 40 //TODO: change this 40 number to only 10
		}
	});

	if (!isLocation(location)) throw new Error('Invalid location');
	const placeDetailPromise = mapTiler.reverseGeocoding(...location, {});

	const [[placeDetail], { getListOfMonuments: nearMonuments }] = await Promise.all([
		placeDetailPromise,
		nearMonumentsPromise
	]);

	return {
		newExperience: {
			placeName: placeDetail.place_name,
			location: location,
			nearMonuments
		}
	};
};
