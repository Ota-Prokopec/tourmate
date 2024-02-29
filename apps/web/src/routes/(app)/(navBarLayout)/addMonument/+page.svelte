<script lang="ts">
	import { goto } from '$app/navigation';
	import { collections } from '$lib/appwrite/appwrite';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Full from '$lib/components/Common/Full.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import mapTiler from '$lib/utils/mapTiler';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Location, MonumentMarkerData } from '@app/ts-types';
	import { locationQueries } from '@app/utils';
	import { useQuery } from '@sveltestack/svelte-query';
	import { SyncLoader } from 'svelte-loading-spinners';
	import type { PageData } from './$types';
	import Geocoding from '$lib/components/Map/Geocoding/Geocoding.svelte';
	import GeocodingMap from '$lib/components/Map/GeocodingMap/GeocodingMap.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import { Button } from 'flowbite-svelte';
	import IconRoute from '$lib/components/Icons/IconRoute.svelte';
	import ButtonGoToTourPage from '$lib/components/Buttons/ButtonGoToTourPage.svelte';

	export let data: PageData;

	let location: Location | undefined | null = $lsStore.usersLocation;
	$: markerLocation = location;
	let userCenter: Location | undefined = undefined;
	let monumentsLoaded = false;
	let mapWindowCenter: Location | undefined = undefined;

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
			<Row class="gap-4 mb-2">
				<Icon icon="fas fa-map-marker-alt" class="text-2xl text-red-500" />
				{$positionDetails.data?.place_name}
			</Row>
			<Column class="gap-0">
				<Text>lat: {markerLocation[0]}</Text>
				<Text>lng: {markerLocation[1]}</Text>
			</Column>
		{/if}
	</Alert>
	<GeocodingMap
		on:moveend={(e) => (mapWindowCenter = e.detail.moveEndLocation)}
		bind:userCenter
		on:dblclick={(e) => (markerLocation = e.detail.dblclickLocation)}
	>
		<Icon
			on:click={() => (markerLocation = mapWindowCenter)}
			class="child:w-10 child:h-10 absolute bottom-0 left-0 m-4 child:fill-yellow-500"
		>
			<IconLocation />
		</Icon>
		{#if markerLocation}
			<Marker class="z-10" on:dragend={loadNewMonuments} draggable bind:location={markerLocation}>
				<Icon><IconLocation /></Icon>
			</Marker>
		{/if}
		{#each monuments as monument}
			<MonumentMarker {monument} />
		{/each}
	</GeocodingMap>

	<ButtonNext
		on:click={next}
		class="absolute bottom-0 right-0 mb-24 mr-4 flex flex-wrap flex-row gap-2"
	/>
	<ButtonGoToTourPage class="absolute bottom-0 right-0 m-2" />
</Full>
