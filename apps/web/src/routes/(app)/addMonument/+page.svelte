<script lang="ts">
	import { goto } from '$app/navigation';
	import { collections } from '$lib/appwrite/appwrite';
	import Full from '$lib/components/Common/Full.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Location, MonumentMarkerData } from '@app/ts-types';
	import { locationQueries } from '@app/utils';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Text from '$lib/components/Common/Text.svelte';
	import mapTiler from '$lib/utils/mapTiler';
	import { useQuery } from '@sveltestack/svelte-query';
	import Column from '$lib/components/Common/Column.svelte';
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';

	export let data: PageData;

	let location: Location | undefined | null = $lsStore.usersLocation;
	$: markerLocation = location;
	let monumentsLoaded = false;

	let monuments: MonumentMarkerData[] = [];

	const loadNewMonuments = async () => {
		if (!markerLocation) throw new Error('markerLocation is not defined');
		const newMonuments = (
			await sdk.getListOfMonumentsForMap({
				location: {
					rangeMeters: 1000,
					location: markerLocation
				}
			})
		).getListOfMonuments;
		monuments = [...monuments, ...newMonuments];
		monumentsLoaded = true;
	};

	$: if (markerLocation && !monumentsLoaded) loadNewMonuments(); //first load

	const next = async () => {
		try {
			if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server

			if (!(await isItOkToCreateMonumentHere()))
				throw new Error('There is something wrong with creating the monument here');
			goto(`/addMonument/detail/${markerLocation[0]}-${markerLocation[1]}`);
		} catch (error) {
			alert(
				'',
				$LL.error.notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage(),
				{
					color: 'red'
				}
			);
		}
	};

	const isItOkToCreateMonumentHere = async () => {
		if (!markerLocation) throw TypeError('markerLocation is not defined');
		const queries = locationQueries(markerLocation, data.twoMonumentsMinimalDistance); // / because it searches around so r = 50meters
		const monumentDocs = await collections.monument.listDocuments(queries);
		return monumentDocs.total === 0 ? true : false; //only when no monument is found around 50meters
	};

	$: positionDetails = useQuery('positionDetails', async () => {
		if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server
		return (await mapTiler.reverseGeocoding(...markerLocation, { limit: 4 })).at(0);
	});
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
			<Column class="gap-0">
				<Text>lat: {markerLocation[0]}</Text>
				<Text>lng: {markerLocation[1]}</Text>
			</Column>
		{/if}
	</Alert>
	<Map>
		{#if markerLocation}
			<Marker class="z-10" on:dragend={loadNewMonuments} draggable bind:location={markerLocation}>
				<Icon><IconLocation /></Icon>
			</Marker>
		{/if}
		{#each monuments as monument}
			<MonumentMarker {monument} />
		{/each}
	</Map>

	<ButtonNext
		on:click={next}
		class="absolute bottom-0 right-0 mb-24 mr-4 flex flex-wrap flex-row gap-2"
	/>
</Full>
