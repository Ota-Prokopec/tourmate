<script lang="ts">
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import MonumentCard from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { Button, Card } from 'flowbite-svelte';
	import { maximalRangeInMetersToConnectMonumentToPicture } from '../../createNewExperience/[lat]-[lng]/options';
	import type { PageData } from './$types';

	export let data: PageData;

	const monument = data.monument;
	const experiences = monument.connectedExperiences;

	let onlyMap = false;
	let distanceInMeters: number | undefined;

	const takePicture = () => {
		if (typeof distanceInMeters === 'undefined') throw new Error('distance is not defined');
		if (distanceInMeters > maximalRangeInMetersToConnectMonumentToPicture) {
			alert(
				$LL.notAbleToConnectMonumentBecauseOfDistanceErrorTitle(),
				$LL.notAbleToConnectMonumentBecauseOfDistanceErrorMessage(),
				{ color: 'yellow' }
			);
			throw new Error('Your distanceInMeters from monument is bigger that maximal distance.');
		}
		goto(`/createNewExperience/${monument.location[0]}-${monument.location[1]}/${monument._id}`);
	};
</script>

{#if !onlyMap}
	<div class="min-w-[400px] absolute top-0 left-0 h-auto z-50">
		<MonumentCard
			bind:distanceInMeters
			class="mobile:w-full mobile:max-w-none"
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
							<Button on:click={() => (onlyMap = true)} color="blue">{$LL.seeOnMap()}</Button>
						</MediaQuery>
						<Button on:click={takePicture} color="blue">{$LL.takePictureHere()}</Button>
					</Column>
				</Right>
			</svelte:fragment>
		</MonumentCard>

		{#if experiences.length}
			<Card class="bg-transparent !pl-0 !pr-0 mobile:!w-full mobile:max-w-none mobile:!p-10">
				<Carousel class="h-min" swiping arrows>
					{#each monument.connectedExperiences as experienceWithoutConnectedMonument}
						{@const experience = {
							...experienceWithoutConnectedMonument,
							connectedMonument: monument
						}}
						<ExperienceCardComponent class="p-0 self-center shadow-none w-full" {experience} />
					{/each}
				</Carousel>
			</Card>
		{/if}
	</div>
{/if}

<Map showUser center={data.monument.location} class="h-[100dvh] fixed top-0">
	<MediaQuery size="mobile">
		<Icon on:click={() => (onlyMap = false)} class="child:w-8 child:h-8 absolute top-0 right-0 m-2">
			<IconTimes />
		</Icon>
	</MediaQuery>

	<Marker class="z-50" location={data.monument.location}>
		<Icon class="child:h-8 child:w-8">
			<IconLocation />
		</Icon>
	</Marker>
</Map>
