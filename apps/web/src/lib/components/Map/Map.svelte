<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { getUsersLocation } from '@app/utils';
	import FullPageLoading from '../Common/FullPageLoading.svelte';
	import { twMerge } from 'tailwind-merge';
	import lsSvelte from '$lib/utils/lsStore';
	import {
		FillExtrusionLayer,
		GeolocateControl,
		MapLibre,
		NavigationControl
	} from 'svelte-maplibre';
	import type { Map } from 'maplibre-gl';

	export let map: Map | undefined = undefined;
	export let location: Location | undefined = $lsSvelte.usersLocation;

	export let zoom: number = 16;
	export let deg = 0;
	let style =
		'https://api.maptiler.com/maps/4f1c74c8-1b8c-4deb-b478-1f58653a6389/style.json?key=gplNC5uqgFO1autCCLdg';

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-full h-full relative', className)}>
	{#if location}
		<MapLibre
			on:click
			{style}
			bind:map
			center={[location[1], location[0]]}
			zoom={14}
			bind:pitch={deg}
			on:zoom={(e) => {
				zoom = e.detail.map.getZoom();
			}}
		>
			<NavigationControl position="top-right" />
			<GeolocateControl
				position="top-left"
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation
				showAccuracyCircle
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
</style>