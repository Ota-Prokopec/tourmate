<script lang="ts">
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import UserItemSkeleton from '$lib/components/User/UserItemSkeleton.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { UserInfo } from '@app/ts-types';

	export let searchingText: string;
	export let limit: number;

	let users: UserInfo[] = [];

	let initialLoading = false;
	let loadingMoreItems = false;

	const loadUsers = async () => {
		initialLoading = users.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = users.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfUsers({ limit: limit, offset: users.length })
			.then(({ getListOfUsers: newUsers }) => {
				users = [...users, ...newUsers];
			});
		initialLoading = false;
		loadingMoreItems = false;
	};

	loadUsers();
</script>

<Paginating
	wrapperClassName="w-full h-auto"
	{loadingMoreItems}
	let:item
	{initialLoading}
	list={users}
	on:loadMore={loadUsers}
>
	<svelte:fragment slot="loading">
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
		<UserItemSkeleton class="w-full" />
	</svelte:fragment>

	<UserItem class="w-full" user={item} />
</Paginating>
