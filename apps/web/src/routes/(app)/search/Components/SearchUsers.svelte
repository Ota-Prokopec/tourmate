<script lang="ts">
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import UserItemSkeleton from '$lib/components/User/UserItemSkeleton.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { UserInfo } from '@app/ts-types';
	import MonumentNotFoundDrawer from '../../createNewExperience/[lat]-[lng]/Components/MonumentNotFoundDrawer.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import NoContent from '$lib/components/Common/NoContent.svelte';

	export let searchingText: string;
	export let limit: number;

	let users: UserInfo[] = [];

	let isLoading = false;

	const loadUsers = async (textValue: string) => {
		isLoading = true; // true only if there are no monuments in the usersMonuments

		await sdk
			.getListOfUsers({ limit: limit, offset: users.length, searchingText: textValue })
			.then(({ getListOfUsers: newUsers }) => {
				users = newUsers;
			});
		isLoading = false;
	};

	loadUsers(searchingText);
	$: loadUsers(searchingText);
</script>

<Column class="gap-4 justify-center items-center w-full ">
	{#if isLoading}
		<UserItemSkeleton />
	{:else if users && users?.length > 0}
		{#each users as user}
			<UserItem class="w-full" {user} />
		{/each}
	{:else}
		<NoContent />
	{/if}
</Column>
