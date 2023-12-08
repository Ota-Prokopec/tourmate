<script lang="ts">
	import LoadMoreButton from '$lib/components/Buttons/LoadMoreButton.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import TransportType from '$lib/components/Experience-monument/transportType/TransportType.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Location, MonumentCard, Topic, Transport } from '@app/ts-types';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingLocation: Location | undefined;
	let isLoading = true;
	let isLoadMoreButtonLoading = false;
	export let limit: number = 10;
	let offset = 0;

	let monuments: MonumentCard[] = [];
	let topics: Topic[] = [];
	let transports: Transport[] = [];

	const addMonuments = async (
		topics?: Topic[],
		transports?: Transport[],
		location?: Location | undefined
	) => {
		try {
			isLoadMoreButtonLoading = true;
			offset += limit;

			const newMonuments = (
				await sdk.getListOfMonumentCards({
					topics,
					transports,
					limit,
					offset: offset - limit,
					location: location
						? {
								location: location,

								rangeMeters: 2500
						  }
						: undefined
				})
			).getListOfMonuments;
			monuments = [...monuments, ...newMonuments];
		} catch (error) {
			alert($LL.monumentsLoadErrorTitle(), $LL.monumentsLoadErrorMessage(), { color: 'red' });
		}
		isLoadMoreButtonLoading = false;

		isLoading = false;
	};

	$: addMonuments(topics, transports, searchingLocation);
</script>

<Column class="gap-4 justify-center">
	<TopicComponent bind:chosenTopics={topics} class="w-full max-w-[400px]" />
	<TransportType bind:chosenTransports={transports} class="w-full max-w-[400px]" />

	{#if isLoading}
		<Row class="gap-4">
			<MonumentCardSkeleton size="normal" />
			<MonumentCardSkeleton size="normal" />
			<MonumentCardSkeleton size="normal" />
			<MonumentCardSkeleton size="normal" />
			<MonumentCardSkeleton size="normal" />
			<MonumentCardSkeleton size="normal" />
			<MonumentCardSkeleton size="normal" />
		</Row>
	{:else if monuments && monuments?.length > 0}
		<Column class="justify-center items-center">
			<Row class="gap-4 justify-center">
				{#each monuments as monument}
					<MonumentCardComponent size="normal" {monument} />
				{/each}
			</Row>
			{#if isLoadMoreButtonLoading}
				<Loading />
			{:else}
				<LoadMoreButton on:click={() => addMonuments(topics, transports, searchingLocation)} />
			{/if}
		</Column>
	{:else}
		<Skeleton divClass="w-full" />
	{/if}
</Column>
