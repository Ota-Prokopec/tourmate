<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard, Topic, Transport } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import { Skeleton } from 'flowbite-svelte';
	import TransportType from '$lib/components/Experience-monument/transportType/TransportType.svelte';

	export let searchingLocation: Location | undefined;
	let isLoading = true;

	const reload = async (
		topics: Topic[],
		transports: Transport[],
		location: Location | undefined
	) => {
		isLoading = true;

		if (!location && !topics.length)
			monuments = (await sdk.getListOfMonumentCards()).getListOfMonuments;
		else if (topics.length && transports.length && location) {
			monuments = (
				await sdk.getListOfMonumentCardsByLocationAndTopicsAndTransports({
					input: { range: 0.04, location: location, topics: topics, transports }
				})
			).getListOfMonumentsByLocationAndTopicsAndTransport;
		} else if (topics.length)
			monuments = (await sdk.getListOfMonumentCardsByTopics({ input: { topics: topics } }))
				.getListOfMonumentsByTopics;
		else if (location) {
			monuments = (
				await sdk.getListOfMonumentCardsByLocationAndTopics({
					input: { range: 0.04, location: location, topics: topics }
				})
			).getListOfMonumentsByLocationAndTopics;
		} else throw new Error('there is no more possible ways to get monument cards');

		isLoading = false;
	};

	let monuments: MonumentCard[] | undefined;
	let topics: Topic[] = [];
	let transports: Transport[] = [];

	$: reload(topics, transports, searchingLocation);
</script>

<div class="w-full h-full flex flex-wrap flex-col gap-4">
	<TopicComponent bind:chosenTopics={topics} class="w-full max-w-[400px]" />
	<TransportType bind:chosenTransports={transports} class="w-full max-w-[400px]" />

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
