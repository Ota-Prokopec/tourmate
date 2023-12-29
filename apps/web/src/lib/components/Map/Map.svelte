<script lang="ts">
	import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
	import { lsStore } from '$lib/utils/lsStore';
	import type { Location } from '@app/ts-types';
	import type { Map } from 'maplibre-gl';
	import { FillExtrusionLayer, GeolocateControl, MapLibre } from 'svelte-maplibre';
	import { twMerge } from 'tailwind-merge';
	import FullPageLoading from '../Common/FullPageLoading.svelte';
	import UserMarker from './Markers/UserMarker.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ load: { center: Location } }>();

	export let map: Map | undefined = undefined;
	export let center: Location | undefined | null = $lsStore.usersLocation;
	$: usersLocation = $lsStore.usersLocation;

	export let zoom: number = 16;
	export let maxZoom: number | undefined = undefined;
	export let minZoom: number | undefined = undefined;
	export let showUser = false;
	export let deg = 0;
	let style = `https://api.maptiler.com/maps/basic-v2/style.json?key=${PUBLIC_MAP_TILER_API_KEY}`;

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-full h-full relative', className)}>
	{#if center}
		<MapLibre
			{style}
			{maxZoom}
			{minZoom}
			bind:map
			center={[center[1], center[0]]}
			zoom={14}
			bind:pitch={deg}
			on:zoom={(e) => {
				zoom = e.detail.map.getZoom();
			}}
			on:load={() => {
				if (!center) throw new Error('center is not defined');
				dispatch('load', { center });
			}}
		>
			<GeolocateControl
				position="top-left"
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation
				showAccuracyCircle={false}
				showUserLocation
			/>
			<FillExtrusionLayer
				source="maptiler_planet"
				sourceLayer="building"
				beforeLayerType={(l) => l.type === 'symbol' && !!l.paint?.['text-color']}
				minzoom={14}
				paint={{
					// Show lower buildings in green, higher in red.
					'fill-extrusion-color': [
						'interpolate',
						['linear'],
						['get', 'render_height'],
						0,
						'#0a0',
						70,
						'#a00'
					],

					// use an 'interpolate' expression to add a smooth transition effect to the
					// buildings as the user zooms in
					'fill-extrusion-height': [
						'interpolate',
						['linear'],
						['zoom'],
						14,
						0,
						14.05,
						['get', 'render_height']
					],
					'fill-extrusion-base': [
						'interpolate',
						['linear'],
						['zoom'],
						14,
						0,
						14.05,
						['get', 'render_min_height']
					],
					'fill-extrusion-opacity': 0.6
				}}
			/>
			{#if showUser && usersLocation}
				<UserMarker location={usersLocation} />
			{/if}
			<slot />
		</MapLibre>
	{:else}
		<FullPageLoading />
	{/if}
</div>

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
	:global(.maplibregl-compact-show) {
		display: none !important;
	}
	:global(.maplibregl-compact) {
		display: none !important;
	}
</style>
