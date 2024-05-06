<script lang="ts">
	import { goto } from '$app/navigation';
	import SeeOnMapButton from '$lib/components/Buttons/SeeOnMapButton.svelte';
	import TakePictureHereButton from '$lib/components/Buttons/TakePictureHereButton.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MonumentCard from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { PageData } from './$types';

	export let data: PageData;

	const monument = data.monument;
	const experiences = monument.connectedExperiences;

	let onlyMap = false;
	let distanceInMeters: number | undefined;

	const seeOnMap = () => (onlyMap = true);
</script>

{#if !onlyMap}
	<MonumentCard
		bind:distanceInMeters
		class="mobile:w-full mobile:max-w-none z-20"
		disableSeeMoreButton
		size="normal"
		monument={data.monument}
	>
		<Text class="ml-2 mt-4">
			{data.monument.about}
		</Text>

		<svelte:fragment slot="bottom">
			<Right>
				<Column class="gap-2 items-end">
					<MediaQuery size="mobile">
						<SeeOnMapButton on:click={seeOnMap} />
					</MediaQuery>
				</Column>
			</Right>
		</svelte:fragment>
	</MonumentCard>
{/if}

<Map showUser userCenter={data.monument.location} class="h-[100dvh] fixed top-0">
	{#if onlyMap}
		<Icon
			on:click={() => (onlyMap = false)}
			class="child:w-8 child:h-8 absolute top-0 right-0 m-2 child:fill-black"
		>
			<IconTimes />
		</Icon>
	{/if}

	<Marker class="z-50" location={data.monument.location}>
		<Icon class="child:h-8 child:w-8">
			<IconLocation />
		</Icon>
	</Marker>
</Map>
