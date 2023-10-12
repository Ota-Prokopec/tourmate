<script lang="ts">
	import MonumentCard from '$lib/components/Experience/Cards/MonumentCard.svelte';
	import type { GraphqlDocument, Monument, MonumentCardData } from '@app/ts-types';

	export let monuments: MonumentCardData[] | undefined;
</script>

{#if monuments}
	{#each monuments as monument}
		<MonumentCard {monument} />
	{/each}
{:else}
	There are no monuments
{/if}
