<script lang="ts">
	import type { UserInfo } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import Avatar from '../Common/Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	import Row from '../Common/Row.svelte';
	import Text from '../Common/Text.svelte';
	import Column from '../Common/Column.svelte';
	import { navigate } from '$lib/utils/navigator';
	const dispatch = createEventDispatcher<{ click: { userId: string; myId: string } }>();

	export let user: UserInfo;
	export let disableMyId = false;
	export let disableProfileLinkOnClick = false;

	let className = '';
	export { className as class };
	export let avatarClass = '';
</script>

<button
	on:click={() => {
		if (!disableProfileLinkOnClick) navigate(`/account/${user.myId}`);
	}}
	on:click={() => dispatch('click', { userId: user.userId, myId: user.myId })}
	class={twMerge('flex items-center', className)}
>
	<Row class="gap-2 items-center justify-start">
		<Avatar src={user.profilePictureURL} class={twMerge('rounded-full w-14 h-14', avatarClass)} />
		<Column class="gap-0 justify-start">
			<Text class="text-left">
				{user.username}
			</Text>
			{#if !disableMyId}
				<Text class="text-sm text-left">
					{user.myId}
				</Text>
			{/if}
		</Column>
	</Row>
</button>
