<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Img } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import { device } from '@app/utils';
	import MonumentCard from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Row from '$lib/components/Common/Row.svelte';

	export let data: PageData;

	const monument = data.monument;
	const experiences = monument.connectedExperiences;
</script>

<Row class="absolute top-0 left-0 z-50 gap-4 w-min h-min m-2">
	<MonumentCard disableSeeMoreButton size="normal" monument={data.monument}>
		<Text class="ml-2 mt-4">
			{data.monument.about}
		</Text>
	</MonumentCard>

	<Card class="bg-transparent !p-0">
		{#if experiences.length}
			<Carousel class="h-min" swiping arrows>
				{#each monument.connectedExperiences as experienceWithoutConnectedMonument}
					{@const experience = {
						...experienceWithoutConnectedMonument,
						connectedMonument: monument
					}}
					<ExperienceCardComponent class="p-0 self-center shadow-none" {experience} />
				{/each}
			</Carousel>
		{/if}
	</Card>
</Row>

<Map location={data.monument.location} class="h-[100dvh] fixed top-0">
	<Marker class="z-50" location={data.monument.location}>
		<Icon icon="fas fa-map-marker-alt" class="text-4xl text-red-500" />
	</Marker>
</Map>
