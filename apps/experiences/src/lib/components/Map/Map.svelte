<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { getDetailsByLatAndLong, getUsersLocation } from '@app/utils';
	import { Map } from '@beyonk/svelte-mapbox';
	import GeolocateControl from '@beyonk/svelte-mapbox/map/controls/GeolocateControl.svelte';
	import Title from '../Common/Title.svelte';
	import Loading from '../Common/Loading.svelte';
	import FullPageLoading from '../Common/FullPageLoading.svelte';
	import { browser } from '$app/environment';
	import NavigationControl from '@beyonk/svelte-mapbox/map/controls/NavigationControl.svelte';
	import ScaleControl from '@beyonk/svelte-mapbox/map/controls/ScaleControl.svelte';

	const token =
		'pk.eyJ1IjoiZXJhbnQ0MiIsImEiOiJjbDdybXo4dmswZ3E5M3FwMnFsazdpb3VoIn0.wXblbreOUt3e8N81CAH0Wg';

	export let map: Map | null = null;
	export let location: Location = [0, 0];
	export let zoom: number = 16;
	export let isLoading = true;

	$: placeDetailsPromise = browser ? getDetailsByLatAndLong(location[0], location[1]) : null;

	getUsersLocation().then((res) => {
		location = res;
		isLoading = false;
	});

	const onZoom = (e: CustomEvent<{ zoom: number }>) => {
		zoom = e.detail.zoom;
	};

	let className = '';
	export { className as class };

	const videoStyle = {
		version: 8,
		sources: {
			satellite: {
				type: 'raster',
				url: 'mapbox://mapbox.satellite',
				tileSize: 256
			},
			video: {
				type: 'video',
				urls: [
					'https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4',
					'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm'
				],
				coordinates: [
					[-122.51596391201019, 37.56238816766053],
					[-122.51467645168304, 37.56410183312965],
					[-122.51309394836426, 37.563391708549425],
					[-122.51423120498657, 37.56161849366671]
				]
			}
		},
		layers: [
			{
				id: 'background',
				type: 'background',
				paint: {
					'background-color': 'rgb(4,7,14)'
				}
			},
			{
				id: 'satellite',
				type: 'raster',
				source: 'satellite'
			},
			{
				id: 'video',
				type: 'raster',
				source: 'video'
			}
		]
	};
</script>

{#if !isLoading}
	<div class="absolute w-full flex justify-center items-center mt-10 top-0">
		{#await placeDetailsPromise}
			<Loading />
		{:then placeDetails}
			<Title class=""
				>{placeDetails?.suburb ??
					placeDetails?.city ??
					placeDetails?.state ??
					placeDetails?.country ??
					placeDetails?.name}</Title
			>
		{/await}
	</div>

	<Map
		on:click
		center={[location[1], location[0]]}
		accessToken={token}
		style={videoStyle}
		bind:this={map}
		zoom={14}
		on:zoom={(e) => {
			//@ts-ignore
			onZoom(e);
		}}
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
		/>
		<slot />
		<NavigationControl />
		<ScaleControl />
	</Map>
{:else}
	<FullPageLoading />
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
