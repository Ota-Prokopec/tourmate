<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import ExpMap from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import mapTiler from '$lib/utils/mapTiler';
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentMarkerData } from '@app/ts-types';
	import { locationQueries } from '@app/utils';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Alert, Button } from 'flowbite-svelte';
	import maplibregl, { type Map } from 'maplibre-gl';
	import { SyncLoader } from 'svelte-loading-spinners';
	import type { PageData } from './$types';
	import { collections } from '$lib/appwrite/appwrite';
	import { alert } from '$src/routes/alertStore';
	import LL from '$src/i18n/i18n-svelte';
	import Full from '$lib/components/Common/Full.svelte';
	import MapDragMarker from '$lib/components/Map/MapDragMarker.svelte';

	export let data: PageData;

	let location: Location | undefined;
	$: markerLocation = location;

	$: usersLocation = $lsStore.usersLocation;

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
	};

	$: if (markerLocation && monuments.length === 0) loadNewMonuments(); //first load

	const next = async () => {
		try {
			if (!markerLocation) throw TypeError('markerLocation is not defined'); //this will probably throw on server

			if (!(await isItOkToCreateMonumentHere()))
				throw new Error('There is something wrong with creating the monument here');
			goto(`/addMonument/detail/${markerLocation[0]}-${markerLocation[1]}`);
		} catch (error) {
			alert('', $LL.cantCreateMonumentHereBecauseOfDistanceBetweenOtherMonuments(), {
				color: 'red'
			});
		}
	};

	const isItOkToCreateMonumentHere = async () => {
		if (!markerLocation) throw TypeError('markerLocation is not defined');
		const queries = locationQueries(markerLocation, data.twoMonumentsMinimalDistance); // / because it searches around so r = 50meters
		const monumentDocs = await collections.monument.listDocuments(queries);
		return monumentDocs.total === 0 ? true : false; //only when no monument is found around 50meters
	};
</script>

<Full>
	<MapDragMarker on:drag={loadNewMonuments} bind:markerLocation>
		{#each monuments as monument}
			<MonumentMarker {monument} />
		{/each}
	</MapDragMarker>

	<Button
		class="absolute bottom-0 right-0 mb-24 mr-4 flex flex-wrap flex-row gap-2"
		color="blue"
		on:click={next}
	>
		<span>označit zde</span>
		<Icon class="w-4 fill-white">
			<IconNext class="w-10 text-white" />
		</Icon>
	</Button>
</Full>
