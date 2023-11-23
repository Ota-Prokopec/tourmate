<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import MeasureDistancesMap from '$lib/components/Map/MeasureDistancesMap.svelte';
	import type { Location } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import { along } from '@turf/turf';
	import type { Feature, LineString } from 'geojson';

	let lines: Feature<LineString> | undefined;
	let points: Location[];
	let distance: number | undefined;
	let pointCount = 20;
    let pointCountOnLine = pointCount/line.
	$: distanceBetweenPoints = distance ? distance / pointCount : 0; //meters

	const getAllPointsOnLine = (stringLine: Feature<LineString> | undefined) => {
		if (!stringLine) throw new Error('line is no defined');
		return new Array(pointCount).fill(1).map((_value, index) => {
			return along(stringLine, distanceBetweenPoints * index, 'meters');
		});
	};

	$: if (line) console.log(getAllPointsOnLine(line));

	//	$: monuments: useQuery('getMonuments', async () => {});
</script>

<Column class="z-20">jljljlsa</Column>

<MeasureDistancesMap
	bind:distance
	bind:lines
	class="w-full h-full absolute top-0 z-10"
	bind:points
/>
