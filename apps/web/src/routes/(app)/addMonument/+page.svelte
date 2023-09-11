<script lang="ts">
	import { goto } from '$app/navigation';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import ExpMap from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import type { Location } from '@app/ts-types';
	import { Alert, Button, Img } from 'flowbite-svelte';
	import maplibregl, { type LngLatLike, type Map } from 'maplibre-gl';
	import type { PageData } from './$types';
	import { useQuery } from '@sveltestack/svelte-query';
	import { getDetailsByLatAndLong } from '@app/utils';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { numberTimingCoords } from '@app/experience-settings';

	export let data: PageData;
	let map: Map;
	let location: Location | undefined;
	$: markerLocation = location;

	$: marker =
		map && location
			? new maplibregl.Marker({ draggable: true })
					.setLngLat({ lat: location[0], lng: location[1] })
					.addTo(map)
			: undefined;

	$: marker?.addClassName('z-50');

	$: marker?.on('dragend', () => {
		if (!marker) throw new TypeError('Marker is undefined');
		const lngLat = marker.getLngLat();
		markerLocation = [lngLat.lat, lngLat.lng];
	});

	const createLocation = () => {
		if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server
		goto(
			`/addMonument/detail/${markerLocation[0] * numberTimingCoords}-${
				markerLocation[1] * numberTimingCoords
			}`
		);
	};

	$: positionDetails = useQuery('positionDetails', async () => {
		try {
			if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server
			return await getDetailsByLatAndLong(markerLocation[0], markerLocation[1]);
		} catch (error) {
			return null;
		}
	});
</script>

<div class="w-[100dvw] h-[100dvh]">
	<Alert class="absolute m-2 z-50 pl-5 pr-5 flex flex-wrap flex-col gap-0" color="dark">
		{#if typeof $positionDetails.data?.name === 'undefined' || !markerLocation}
			<SyncLoader color="black" size={30} />
		{:else}
			<div class="flex flex-wrap flex-row gap-4 mb-2">
				<Icon icon="fas fa-map-marker-alt" class="text-2xl text-red-500" />
				{$positionDetails.data?.name}
			</div>
			<span>lat: {markerLocation[0]}</span>
			<span> lng: {markerLocation[1]} </span>
		{/if}
	</Alert>
	<ExpMap bind:location bind:map class="w-full h-full">
		{#each data.monuments as monument}
			<MonumentMarker {monument} />
		{/each}
	</ExpMap>

	<Button
		class="absolute bottom-0 right-0 mb-24 mr-4 flex flex-wrap flex-row gap-2"
		color="blue"
		on:click={createLocation}
	>
		<span>označit zde</span>
		<IconNext class="w-10 text-white" />
	</Button>
</div>
