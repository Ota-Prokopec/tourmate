<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard, Topic } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';

	export let searchingLocation: Location | undefined;

	$: resultSearchedByPlace = useQuery(
		'resultSearchedByPlace',
		async () =>
			await sdk.getListOfMonumentCards(
				searchingLocation
					? {
							input: { range: 0.04, location: searchingLocation, topics: topics }
					  }
					: { topics: topics }
			)
	);

	let monuments: MonumentCard[] | undefined;
	let topics: Topic[] = [];

	$: isLoading = $resultSearchedByPlace?.isLoading;
	$: monuments = $resultSearchedByPlace.data?.getListOfMonuments;
</script>

<div class="w-full h-full flex flex-wrap flex-col gap-4">
	<TopicComponent bind:chosenTopics={topics} class="w-full max-w-[400px]" />

	{#if isLoading}
		<FullPageLoading />
	{:else if monuments}
		{#each monuments as monument}
			<MonumentCardComponent {monument} />
		{/each}
	{/if}
</div>
