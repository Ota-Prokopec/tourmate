<script lang="ts">
	import { goto } from '$app/navigation';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import ExpMap from '$lib/components/Map/Map.svelte';
	import type { Location } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import maplibregl, { type LngLatLike, type Map } from 'maplibre-gl';

	let map: Map;
	let location: Location;
	let markerLocation: Location;

	$: marker = map
		? new maplibregl.Marker({ draggable: true })
				.setLngLat({ lat: location[0], lng: location[1] })
				.addTo(map)
		: undefined;

	$: marker?.on('dragend', () => {
		if (!marker) throw new TypeError('Marker is undefined');
		const lngLat = marker.getLngLat();
		markerLocation = [lngLat.lat, lngLat.lng];
	});

	$: console.log(markerLocation);

	const createLocation = () =>
		goto(`/addFamousPlace/detail/${markerLocation[0]}/${markerLocation[1]}`);
</script>

<div class="w-[100dvw] h-[100dvh]">
	<ExpMap bind:location bind:map class="w-full h-full" />

	<Button
		class="absolute bottom-0 right-0 mb-24 mr-4 flex flex-wrap flex-row gap-2"
		color="blue"
		on:click={createLocation}
	>
		<span>označit zde</span>
		<IconNext class="w-10 text-white" />
	</Button>
</div>
