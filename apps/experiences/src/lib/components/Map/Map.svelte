<script lang="ts">
	import type { Position } from '@app/ts-types';
	import { getUsersLocation } from '@app/utils';
	import { Geocoder, Map, controls } from '@beyonk/svelte-mapbox';
	import GeolocateControl from '@beyonk/svelte-mapbox/map/controls/GeolocateControl.svelte';
	import { onMount } from 'svelte';

	const token =
		'pk.eyJ1IjoiZXJhbnQ0MiIsImEiOiJjbDdybXo4dmswZ3E5M3FwMnFsazdpb3VoIn0.wXblbreOUt3e8N81CAH0Wg';

	export let map: Map | null = null;
	export let position: Position | undefined;
	export let mapZoom: number = 16;

	onMount(async () => {
		position = await getUsersLocation();
	});

	let className = '';
	export { className as class };
</script>

{#if position}
	<Map
		class={className}
		center={[position[1], position[0]]}
		accessToken={token}
		style="mapbox://styles/mapbox/outdoors-v12?optimize=true"
		bind:this={map}
		zoom={mapZoom}
	>
		<GeolocateControl
			options={{
				trackUserLocation: true,
				showUserHeading: true,
				showUserLocation: true,
				showAccuracyCircle: true,
				positionOptions: {
					enableHighAccuracy: true
				}
			}}
			on:geolocate={(e) => {
				console.log(e.detail.coords);

				// @ts-ignore
				const { latitude, longitude } = e.detail.coords;
				position = [latitude, longitude];
			}}
		/>
	</Map>
{/if}

<style>
	:global(.mapboxgl-marker) {
		cursor: pointer;
	}
	:global(.mapboxgl-ctrl-logo) {
		display: none !important;
	}
	:global(.mapboxgl-ctrl-bottom-right) {
		display: none !important;
	}
</style>
