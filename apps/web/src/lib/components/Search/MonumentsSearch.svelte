<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import NoContent from '$lib/components/Common/NoContent.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
	import MonumentCardSkeleton from '../Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';

	export let searchingText: string;

	export let limit: number = 10;

	let monuments: MonumentCard[] = [];
	export let isLoading = true;
	let isLoadMoreButtonLoading = false;

	const loadMonuments = async (inputValue: string) => {
		try {
			isLoading = true;
			isLoadMoreButtonLoading = true;
			const newMonuments = (await sdk.getListOfMonumentCards({ limit: limit, name: inputValue }))
				.getListOfMonuments;
			monuments = newMonuments;
		} catch (error) {
			alert('', $LL.error.monumentLoadErrorMessage(), { color: 'red' });
		}
		isLoading = false;
		isLoadMoreButtonLoading = false;
	};

	$: loadMonuments(searchingText);
</script>

<Column class="w-full items-center">
	{#if isLoading}
		<slot name="loading" />
	{:else if monuments?.length}
		{#each monuments as monument}
			<slot {monument} />
		{/each}
	{:else}
		<NoContent />
	{/if}
</Column>
