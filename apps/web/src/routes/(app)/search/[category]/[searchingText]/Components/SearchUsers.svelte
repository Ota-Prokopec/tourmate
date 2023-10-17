<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingText: string;

	$: usersGraphql = useQuery(
		'monuments',
		async () => await sdk.getListOfAccountsBySearching({ searchingText })
	);

	$: isLoading = $usersGraphql?.isLoading;

	$: users = $usersGraphql.data?.getAccounts;
</script>

{#if isLoading}
	<FullPageLoading />
{:else if users?.length}
	{#each users as user}
		<UserItem {user} />
	{/each}
{:else}
	<Skeleton divClass="w-full" />
{/if}
