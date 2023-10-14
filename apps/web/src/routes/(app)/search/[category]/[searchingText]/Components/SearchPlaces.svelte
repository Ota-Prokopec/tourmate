<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import ExperienceCardComponent from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import MonumentCardComponent from '$lib/components/Experience/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { ExperienceCard, MonumentCard } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';

	export let searchingText: string;

	$: resultSearchedByPlace = useQuery(
		'resultSearchedByPlace',
		async () => await sdk.getListOfPlaceCards()
	);

	$: isLoading = $resultSearchedByPlace?.isLoading;

	let experiences: ExperienceCard[] | undefined;
	let monuments: MonumentCard[] | undefined;

	$: experiences = $resultSearchedByPlace.data?.getListOfExperiences;
	$: monuments = $resultSearchedByPlace.data?.getListOfMonuments;
</script>

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
