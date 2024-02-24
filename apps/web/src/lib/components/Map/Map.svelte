<script lang="ts">
	import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
	import { lsStore } from '$lib/utils/lsStore';
	import type { Base64, Location } from '@app/ts-types';
	import type { Map } from 'maplibre-gl';
	import { createEventDispatcher } from 'svelte';
	import { FillExtrusionLayer, GeolocateControl, MapLibre } from 'svelte-maplibre';
	import { twMerge } from 'tailwind-merge';
	import FullPageLoading from '../Common/FullPageLoading.svelte';
	import UserMarker from './Markers/UserMarker.svelte';

	const dispatch = createEventDispatcher<{
		load: { userCenter: Location };
		dblclick: { dblclickLocation: Location };
		moveend: { moveEndLocation: Location };
	}>();

	export let map: Map | undefined = undefined;
	export let userCenter: Location | undefined | null = $lsStore.usersLocation;
	$: usersLocation = $lsStore.usersLocation;

	export let zoom: number = 16;
	export let maxZoom: number | undefined = undefined;
	export let minZoom: number | undefined = undefined;
	export let showUser = false;
	export let userProfilePicture: string | Base64 | undefined = undefined;
	export let deg = 0;
	let style = `https://api.maptiler.com/maps/4f1c74c8-1b8c-4deb-b478-1f58653a6389/style.json?key=${PUBLIC_MAP_TILER_API_KEY}`;

	//events

	$: map?.on('dblclick', (e) =>
		dispatch('dblclick', { dblclickLocation: [e.lngLat.lat, e.lngLat.lng] })
	);
	$: map?.on('moveend', (e) => {
		const mapBoxCenter = e.target.getCenter();
		if (!mapBoxCenter) return;
		dispatch('moveend', { moveEndLocation: [mapBoxCenter.lat, mapBoxCenter.lng] });
	});

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-full h-full relative', className)}>
	{#if userCenter}
		<MapLibre
			{style}
			{maxZoom}
			{minZoom}
			bind:map
			center={[userCenter[1], userCenter[0]]}
			zoom={14}
			bind:pitch={deg}
			on:zoom={(e) => {
				zoom = e.detail.map.getZoom();
			}}
			on:load={() => {
				if (!userCenter) throw new Error('center is not defined');
				dispatch('load', { userCenter });
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
			{#if showUser && usersLocation && userProfilePicture}
				<UserMarker {userProfilePicture} location={usersLocation} />
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
