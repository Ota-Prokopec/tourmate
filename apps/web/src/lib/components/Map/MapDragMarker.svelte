<script lang="ts">
	import ExpMap from '$lib/components/Map/Map.svelte';
	import type { Location } from '@app/ts-types';
	import maplibregl, { Marker, type Map } from 'maplibre-gl';
	import Alert from '../Alert/Alert.svelte';
	import Text from '../Common/Text.svelte';
	import Icon from '../Common/Icon.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import mapTiler from '$lib/utils/mapTiler';
	import { useQuery } from '@sveltestack/svelte-query';
	import Full from '../Common/Full.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ drag: { lat: number; lng: number } }>();

	export let center: Location | undefined = undefined;
	export let map: Map | undefined = undefined;
	export let markerLocation: Location | undefined = center;
	export let marker: Marker | undefined = undefined;
	export let markerClassNames = '';
	export let zoom: number = 14;
	export let minZoom: number | undefined = undefined;
	export let maxZoom: number | undefined = undefined;
	export let markerElement: HTMLElement | undefined = undefined;
	$: markerElement = marker?.getElement();

	$: marker =
		map && center
			? new maplibregl.Marker({ draggable: true })
					.setLngLat({ lat: center[0], lng: center[1] })
					.addTo(map)
			: undefined;

	$: if (marker) markerClassNames.split(' ').map((className) => marker?.addClassName(className));

	$: marker?.addClassName('z-50');

	$: marker?.on('dragend', () => {
		if (!marker) throw new TypeError('Marker is undefined');
		const lngLat = marker.getLngLat();
		const { lng, lat } = lngLat;
		markerLocation = [lat, lng];
		dispatch('drag', { lat, lng });
	});

	$: positionDetails = useQuery('positionDetails', async () => {
		if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server
		return (await mapTiler.reverseGeocoding(...markerLocation, { limit: 4 })).at(0);
	});

	const load = (loadLocation: Location) => (markerLocation = loadLocation);
</script>

<Full>
	<Alert
		class="absolute m-2 z-50 pl-5 pr-5 flex flex-wrap flex-col gap-0 min-w-[250px]"
		color="dark"
	>
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
	<ExpMap
		{minZoom}
		{maxZoom}
		bind:zoom
		on:load={(e) => {
			const { lat, lng } = e.detail.getCenter();
			load([lat, lng]);
		}}
		bind:center
		bind:map
		class="w-full h-full"
	>
		<slot />
	</ExpMap>
</Full>
