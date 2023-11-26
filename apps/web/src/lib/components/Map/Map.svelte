<script lang="ts">
	import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
	import lsSvelte from '$lib/utils/lsStore';
	import type { Location } from '@app/ts-types';
	import type { Map } from 'maplibre-gl';
	import { FillExtrusionLayer, GeolocateControl, MapLibre } from 'svelte-maplibre';
	import { twMerge } from 'tailwind-merge';
	import FullPageLoading from '../Common/FullPageLoading.svelte';

	export let map: Map | undefined = undefined;
	export let location: Location | undefined = $lsSvelte.usersLocation;

	export let zoom: number = 16;
	export let maxZoom: number | undefined = undefined;
	export let minZoom: number | undefined = undefined;
	export let deg = 0;
	let style = `https://api.maptiler.com/maps/basic-v2/style.json?key=${PUBLIC_MAP_TILER_API_KEY}`;

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-full h-full relative', className)}>
	{#if location}
		<MapLibre
			{style}
			{maxZoom}
			{minZoom}
			bind:map
			center={[location[1], location[0]]}
			zoom={14}
			bind:pitch={deg}
			on:zoom={(e) => {
				zoom = e.detail.map.getZoom();
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
