<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { getDetailsByLatAndLong, getUsersLocation } from '@app/utils';
	import { Map } from '@beyonk/svelte-mapbox';
	import GeolocateControl from '@beyonk/svelte-mapbox/map/controls/GeolocateControl.svelte';
	import { onMount } from 'svelte';
	import Title from '../Common/Title.svelte';
	import { twMerge } from 'tailwind-merge';
	import Loading from '../Common/Loading.svelte';
	import FullPageLoading from '../Common/FullPageLoading.svelte';
	import { browser } from '$app/environment';

	const token =
		'pk.eyJ1IjoiZXJhbnQ0MiIsImEiOiJjbDdybXo4dmswZ3E5M3FwMnFsazdpb3VoIn0.wXblbreOUt3e8N81CAH0Wg';

	export let map: Map | null = null;
	export let location: Location = [0, 0];
	export let zoom: number = 16;
	export let isLoading = true;

	$: placeDetailsPromise = browser ? getDetailsByLatAndLong(location[0], location[1]) : null;

	onMount(async () => {
		location = await getUsersLocation();
		isLoading = false;
	});

	const onZoom = (e: CustomEvent<{ zoom: number }>) => {
		zoom = e.detail.zoom;
	};

	let className = '';
	export { className as class };
</script>

{#if !isLoading}
	<div class="absolute w-full flex justify-center items-center z-40 mt-10">
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
		center={[location[1], location[0]]}
		accessToken={token}
		style="mapbox://styles/mapbox/outdoors-v12?optimize=true"
		bind:this={map}
		{zoom}
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
			on:geolocate={(e) => {
				console.log(e);

				// @ts-ignore
				const { latitude, longitude } = e.detail.coords;
				location = [latitude, longitude];
			}}
		/>
		<slot />
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
