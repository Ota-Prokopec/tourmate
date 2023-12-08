<script lang="ts">
	import LoadMoreButton from '$lib/components/Buttons/LoadMoreButton.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingText: string;

	export let limit: number = 10;
	let offset = 0;

	let monuments: MonumentCard[] = [];
	let isLoading = true;
	let isLoadMoreButtonLoading = false;

	const addMonuments = async () => {
		try {
			isLoadMoreButtonLoading = true;
			const newMonuments = (
				await sdk.getListOfMonumentCards({ limit: limit, name: searchingText, offset })
			).getListOfMonuments;
			monuments = [...monuments, ...newMonuments];
			offset += limit;
		} catch (error) {
			alert($LL.monumentsLoadErrorTitle(), $LL.monumentsLoadErrorMessage(), { color: 'red' });
		}
		isLoadMoreButtonLoading = false;
		isLoading = false;
	};

	addMonuments();
</script>

{#if isLoading}
	<FullPageLoading />
{:else if monuments?.length}
	<Column class="w-full items-center">
		<Row class="gap-4 justify-center">
			{#each monuments as monument}
				<MonumentCardComponent size="normal" {monument} />
			{/each}
		</Row>

		{#if monuments.length}
			{#if isLoadMoreButtonLoading}
				<Loading />
			{:else}
				<LoadMoreButton on:click={addMonuments} />
			{/if}
		{/if}
	</Column>
{:else}
	<Skeleton divClass="w-full" />
{/if}
