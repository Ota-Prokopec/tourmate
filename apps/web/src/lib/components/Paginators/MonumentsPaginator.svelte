<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import NotFound from '$lib/components/Common/NoContent.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Location, MonumentCard, Topic, Transport } from '@app/ts-types';

	export let searchingLocation: Location | undefined = undefined;
	let isLoading = true;
	let isLoadMoreButtonLoading = false;

	export let limit: number = 10;
	export let offset = 0;
	export let monuments: MonumentCard[] = [];
	export let topics: Topic[] = [];
	export let transports: Transport[] = [];
	export let searchingText: string | undefined = undefined;

	const addMonuments = async (
		topics?: Topic[],
		transports?: Transport[],
		location?: Location | undefined,
		searchingText?: string
	) => {
		try {
			isLoadMoreButtonLoading = true;
			offset += limit;

			const newMonuments = (
				await sdk.getListOfMonumentCards({
					topics,
					transports,
					limit,
					name: searchingText,
					location: location
						? {
								location: location,
								rangeMeters: 2500
						  }
						: undefined
				})
			).getListOfMonuments;
			monuments = newMonuments;
		} catch (error) {
			alert('', $LL.error.monumentLoadErrorMessage(), { color: 'red' });
		}

		isLoading = false;
	};

	$: addMonuments(topics, transports, searchingLocation, searchingText);
</script>

<Column class="gap-4 justify-center items-center w-full ">
	{#if isLoading}
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
	{:else if monuments && monuments?.length > 0}
		{#each monuments as monument}
			<MonumentCardComponent size="normal" {monument} />
		{/each}
	{:else}
		<NotFound />
	{/if}
</Column>
