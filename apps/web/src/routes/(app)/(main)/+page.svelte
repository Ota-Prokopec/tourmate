<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import { myNewExperienceStore } from '../createNewExperience/editPicture/newExperienceStore';
	import type { Base64, Location } from '@app/ts-types';
	import { getUsersLocation, roundNumber } from '@app/utils';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';
	import type { PageData } from './$types';
	import ExperienceMarker from '$lib/components/Map/Markers/ExperienceMarker.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	import { sdk } from '$src/graphql/sdk';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconSettings from '$lib/components/Icons/IconSettings.svelte';
	import MapSettings from '$lib/components/Map/settings/MapSettings.svelte';
	import type { MapSetttings } from '$lib/components/Map/settings/mapSettings';
	import lsStore from '$lib/utils/lsStore';

	export let data: PageData;
	$: location = $lsStore.usersLocation;

	$: monuments = useQuery('monuments', async () => {
		if (!location) throw new Error('location is no available');
		return (await sdk.getListOfMonumentsForMap({ location: { location } })).getListOfMonuments;
	});

	let mapZoom: number;

	let almostProfile = false;
	let almostProfileImageSrc: string | Base64;

	let settingsHidden = true;
	let mapSettings: MapSetttings = {
		seeExperiences: false,
		seeMonuments: true
	};
</script>

<MapSettings bind:settingsHidden bind:settings={mapSettings} />

<Map deg={45} bind:zoom={mapZoom} bind:location>
	<Icon
		on:click={() => (settingsHidden = false)}
		class="absolute top-0 right-0 m-4 child:fill-black child:w-9 child:h-9"
	>
		<IconSettings />
	</Icon>

	{#if mapSettings.seeMonuments}
		{#if $monuments.data}
			{#each $monuments.data as monument}
				<MonumentMarker zoom={mapZoom} {monument} />
			{/each}
		{/if}
	{/if}
</Map>
{#if almostProfile}
	<AlmostProfileWithMainImage
		on:close={() => (almostProfile = false)}
		class="absolute sm:left-0 sm:top-0 sm:m-4 z-[60]"
		userInfo={data.user}
		imgSrc={almostProfileImageSrc}
	/>
{/if}
