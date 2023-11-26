<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import TransportType from '$lib/components/Experience-monument/transportType/TransportType.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard, Topic, Transport } from '@app/ts-types';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingLocation: Location | undefined;
	let isLoading = true;

	const reload = async (
		topics?: Topic[],
		transports?: Transport[],
		location?: Location | undefined
	) => {
		isLoading = true;

		monuments = (
			await sdk.getListOfMonumentCards({
				topics,
				transports,
				location: location
					? {
							location: location
					  }
					: undefined
			})
		).getListOfMonuments;

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
		<Row class="gap-4">
			{#each monuments as monument}
				<MonumentCardComponent size="normal" {monument} />
			{/each}
		</Row>
	{:else}
		<Skeleton divClass="w-full" />
	{/if}
</div>
