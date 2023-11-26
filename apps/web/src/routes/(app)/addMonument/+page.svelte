<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import ExpMap from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import mapTiler from '$lib/utils/mapTiler';
	import { sdk } from '$src/graphql/sdk';
	import type { Location } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Alert, Button } from 'flowbite-svelte';
	import maplibregl, { type Map } from 'maplibre-gl';
	import { SyncLoader } from 'svelte-loading-spinners';

	let map: Map;
	let location: Location | undefined;
	$: markerLocation = location;

	$: usersLocation = $lsStore.usersLocation;

	const monuments = useQuery('monuments', async () => {
		if (!usersLocation) throw new Error('users location is not available');
		return await sdk.getListOfMonumentsForMap({
			location: {
				location: usersLocation
			}
		});
	});

	$: monumentsLoaded = $monuments.data && !$monuments.isLoading && !$monuments.isError;

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
		goto(`/addMonument/detail/${markerLocation[0]}-${markerLocation[1]}`);
	};

	$: positionDetails = useQuery('positionDetails', async () => {
		if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server
		return (await mapTiler.reverseGeocoding(...markerLocation, { limit: 4 })).at(0);
	});
</script>

<div class="w-[100dvw] h-[100dvh]">
	<Alert class="absolute m-2 z-50 pl-5 pr-5 flex flex-wrap flex-col gap-0" color="dark">
		{#if $positionDetails.isLoading || !markerLocation}
			<SyncLoader color="black" size={30} />
		{:else}
			<div class="flex flex-wrap flex-row gap-4 mb-2">
				<Icon icon="fas fa-map-marker-alt" class="text-2xl text-red-500" />
				{$positionDetails.data?.place_name}
			</div>
			<Text>lat: {markerLocation[0]}</Text>
			<Text>lng: {markerLocation[1]}</Text>
		{/if}
	</Alert>
	<ExpMap bind:location bind:map class="w-full h-full">
		{#if monumentsLoaded && $monuments.data?.getListOfMonuments}
			{#each $monuments.data?.getListOfMonuments as monument}
				<MonumentMarker {monument} />
			{/each}
		{/if}
	</ExpMap>

	<Button
		class="absolute bottom-0 right-0 mb-24 mr-4 flex flex-wrap flex-row gap-2"
		color="blue"
		on:click={createLocation}
	>
		<span>označit zde</span>
		<Icon class="w-4 fill-white">
			<IconNext class="w-10 text-white" />
		</Icon>
	</Button>
</div>
