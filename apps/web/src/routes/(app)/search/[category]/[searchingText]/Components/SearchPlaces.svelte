<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard, Topic } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import { getUsersLocation } from '@app/utils';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingLocation: Location | undefined;
	let isLoading = true;

	$: console.log(searchingLocation);

	$: resultSearchedByPlace = useQuery('resultSearchedByPlace', async () => {
		let res: MonumentCard[];
		isLoading = true;

		if (!searchingLocation) {
			res = (await sdk.getListOfMonumentCards()).getListOfMonuments;
		} else {
			res = (
				await sdk.getListOfMonumentCardsByLocationAndTopics({
					input: { range: 0.04, location: searchingLocation, topics: topics }
				})
			).getListOfMonumentsByLocationAndTopics;
		}

		isLoading = false;
		return res;
	});

	let monuments: MonumentCard[] | undefined;
	let topics: Topic[] = [];

	$: monuments = $resultSearchedByPlace.data;
</script>

<div class="w-full h-full flex flex-wrap flex-col gap-4">
	<TopicComponent bind:chosenTopics={topics} class="w-full max-w-[400px]" />

	{#if isLoading}
		<FullPageLoading />
	{:else if monuments && monuments?.length > 0}
		{#each monuments as monument}
			<MonumentCardComponent {monument} />
		{/each}
	{:else}
		<Skeleton divClass="w-full" />
	{/if}
</div>
