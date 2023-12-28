<script lang="ts">
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import MeasureDistancesMap from '$lib/components/Map/MeasureDistancesMap.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Location, MonumentMarkerData } from '@app/ts-types';
	import { isLocation } from '@app/utils';
	import * as turf from '@turf/turf';
	import { distanceTo } from 'geolocation-utils';

	//TODO: make a limit for this because there could be really many requests to appwrite (bandwidth) and cloudinary pictures

	export let maxZoom = 16;
	export let minZoom = 16;
	let locations: Location[] = [];
	let monuments: MonumentMarkerData[] = [];

	$: if (locations.length >= 2) {
		renderMonuments(locations);
	}

	const getLocationsInAreaOfTwoPoints = (startingLocation: Location, endingLocation: Location) => {
		if (locations.length < 2) throw new Error('locations.length must be at least 2 locations');

		const geographyLineFromTwoLastPoints = turf.lineString([startingLocation, endingLocation]);

		const totalDistanceForTwoLastPoints = distanceTo(
			{ lat: startingLocation[0], lng: startingLocation[1] },
			{ lat: endingLocation[0], lng: endingLocation[1] }
		);

		const mapRange = (50 * totalDistanceForTwoLastPoints) / 60; //!in meters

		const monumensCount = Math.ceil(totalDistanceForTwoLastPoints / mapRange);

		const distanceBetweenBetweenPoints = totalDistanceForTwoLastPoints / monumensCount;

		const searchingLocations = [...new Array(monumensCount)]
			.map((location, i) =>
				turf.along(geographyLineFromTwoLastPoints, distanceBetweenBetweenPoints * i, 'meters')
			)
			.map((geographyAlongValue) => {
				const location = [
					geographyAlongValue.geometry.coordinates[1],
					geographyAlongValue.geometry.coordinates[0]
				];
				if (!isLocation(location)) throw new Error('this is not a type of location');
				return location;
			});

		return [searchingLocations, mapRange] as const;
	};

	const renderMonuments = async (locations: Location[]) => {
		try {
			const startingLocation = locations[locations.length - 2];
			const endingLocation = locations[locations.length - 1];
			if (!startingLocation) throw new Error('startingLocation is not defined');
			if (!endingLocation) throw new Error('endingLocation is not defined');

			const [searchingLocations, mapRange] = getLocationsInAreaOfTwoPoints(
				startingLocation,
				endingLocation
			);
			const resesPromise = searchingLocations.map((location) =>
				sdk.getListOfMonumentsForMap({ location: { location: location, rangeMeters: mapRange } })
			);
			const reses = await Promise.all(resesPromise);
			const newMonuments = reses.flatMap((res) => res.getListOfMonuments);

			monuments = [...monuments, ...newMonuments];
		} catch (error) {
			alert('', $LL.page.plan.planningError(), { color: 'red' });
		}
	};

	const addPoint = async (location: Location) => {
		locations = [...locations, location];
	};

	const reset = () => {
		locations = [];
		monuments = [];
	};
</script>

<MeasureDistancesMap
	on:reset={reset}
	{maxZoom}
	{minZoom}
	on:newPoint={(e) => addPoint(e.detail.location)}
	class="w-full h-full absolute top-0 z-10"
>
	{#each monuments as monument}
		<MonumentMarker {monument} />
	{/each}
</MeasureDistancesMap>
