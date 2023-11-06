<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingText: string;

	$: monumentsGraphql = useQuery(
		'monuments',
		async () => await sdk.getListOfMonumentCards({ limit: 10, name: searchingText })
	);

	$: isLoading = $monumentsGraphql?.isLoading || typeof $monumentsGraphql.data === 'undefined';

	$: monuments = $monumentsGraphql.data?.getListOfMonuments;

	$: console.log(monuments);
</script>

{#if isLoading}
	<FullPageLoading />
{:else if monuments?.length}
	{#each monuments as monument}
		<MonumentCardComponent size="normal" {monument} />
	{/each}
{:else}
	<Skeleton divClass="w-full" />
{/if}
