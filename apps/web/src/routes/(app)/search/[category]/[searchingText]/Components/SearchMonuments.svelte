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

	export let searchingText: string;

	export let limit: number = 10;

	let monuments: MonumentCard[] = [];
	let isLoading = true;
	let isLoadMoreButtonLoading = false;

	const loadMonuments = async (inputValue: string) => {
		try {
			isLoadMoreButtonLoading = true;
			const newMonuments = (await sdk.getListOfMonumentCards({ limit: limit, name: inputValue }))
				.getListOfMonuments;
			monuments = newMonuments;
		} catch (error) {
			alert($LL.monumentsLoadErrorTitle(), $LL.monumentsLoadErrorMessage(), { color: 'red' });
		}
		isLoading = false;
	};

	$: loadMonuments(searchingText);
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
	</Column>
{:else}
	<NoContent />
{/if}
