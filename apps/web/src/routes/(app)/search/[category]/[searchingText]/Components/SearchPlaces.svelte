<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/ExperienceCard.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/MonumentCard.svelte';
	import Topic from '$lib/components/Experience-monument/topic/Topic.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { ExperienceCard, Location, MonumentCard } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';

	export let searchingLocation: Location | undefined;

	$: resultSearchedByPlace = useQuery(
		'resultSearchedByPlace',
		async () =>
			await sdk.getListOfMonumentCards(
				searchingLocation
					? {
							input: { range: 0.04, location: searchingLocation }
					  }
					: {}
			)
	);

	$: isLoading = $resultSearchedByPlace?.isLoading;

	let experiences: ExperienceCard[] | undefined;
	let monuments: MonumentCard[] | undefined;

	//$: experiences = $resultSearchedByPlace.data?.getListOfExperiences;
	$: monuments = $resultSearchedByPlace.data?.getListOfMonuments;
</script>

<div class="w-full h-full flex flex-wrap flex-col gap-4">
	<Topic class="w-full max-w-[400px]" />

	{#if isLoading}
		<FullPageLoading />
	{:else}
		{#if monuments}
			{#each monuments as monument}
				<MonumentCardComponent {monument} />
			{/each}
		{/if}

		{#if experiences}
			{#each experiences as experience}
				<ExperienceCardComponent {experience} />
			{/each}
		{/if}
	{/if}
</div>
