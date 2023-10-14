<script lang="ts">
	import MonumentCardComponent from '$lib/components/Experience/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { MonumentCard } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';

	export let searchingText: string;

	$: monumentsGraphql = useQuery('monuments', async () => await sdk.getListOfMonumentCards());

	let isLoading = $monumentsGraphql.isLoading;

	$: monuments = $monumentsGraphql.data?.getListOfMonuments;
</script>

{#if monuments}
	{#each monuments as monument}
		<MonumentCardComponent {monument} />
	{/each}
{:else}
	There are no monuments
{/if}
