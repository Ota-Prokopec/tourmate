<script lang="ts">
	import { goto } from '$app/navigation';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Skeleton } from 'flowbite-svelte';

	export let searchingText: string;

	$: usersGraphql = useQuery(
		'monuments',
		async () => await sdk.getListOfUsersBySearching({ searchingText })
	);

	$: isLoading = $usersGraphql?.isLoading;

	$: users = $usersGraphql.data?.getUsers;
</script>

<Center>
	{#if isLoading}
		<FullPageLoading />
	{:else if users?.length}
		<Column class="gap-4">
			{#each users as user}
				<UserItem on:click={(e) => goto(`/account/${e.detail.myId}`)} {user} />
			{/each}
		</Column>
	{:else}
		<Skeleton divClass="w-full" />
	{/if}
</Center>
