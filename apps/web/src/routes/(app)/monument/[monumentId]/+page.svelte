<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import MonumentCard from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import LL from '$src/i18n/i18n-svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';

	export let data: PageData;

	const monument = data.monument;
	const experiences = monument.connectedExperiences;

	let onlyMap = false;
</script>

{#if !onlyMap}
	<Row class="absolute top-0 left-0 z-50 gap-4 mobile:w-full">
		<MonumentCard
			class="mobile:w-full mobile:max-w-none"
			disableSeeMoreButton
			size="normal"
			monument={data.monument}
		>
			<Text class="ml-2 mt-4">
				{data.monument.about}
			</Text>

			<svelte:fragment slot="bottom">
				<MediaQuery size="mobile">
					<Right class="">
						<Button on:click={() => (onlyMap = true)} color="blue">{$LL.seeOnMap()}</Button>
					</Right>
				</MediaQuery>
			</svelte:fragment>
		</MonumentCard>

		{#if experiences.length}
			<Card class="bg-transparent !p-0">
				<Carousel class="h-min" swiping arrows>
					{#each monument.connectedExperiences as experienceWithoutConnectedMonument}
						{@const experience = {
							...experienceWithoutConnectedMonument,
							connectedMonument: monument
						}}
						<ExperienceCardComponent class="p-0 self-center shadow-none" {experience} />
					{/each}
				</Carousel>
			</Card>
		{/if}
	</Row>
{/if}

<Map location={data.monument.location} class="h-[100dvh] fixed top-0">
	<MediaQuery size="mobile">
		<Icon on:click={() => (onlyMap = false)} class="child:w-8 child:h-8 absolute top-0 right-0 m-2">
			<IconTimes />
		</Icon>
	</MediaQuery>

	<Marker class="z-50" location={data.monument.location}>
		<Icon icon="fas fa-map-marker-alt" class="text-4xl text-red-500" />
	</Marker>
</Map>
