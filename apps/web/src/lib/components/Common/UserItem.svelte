<script lang="ts">
	import type { UserInfo } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import Avatar from './Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ click: { userId: string } }>();

	export let user: UserInfo;
	export let disableMyId = false;

	let className = '';
	export { className as class };
	export let avatarClass = '';
</script>

<button
	on:click={() => dispatch('click', { userId: user.userId })}
	class={twMerge('flex items-center space-x-4', className)}
>
	<Avatar src={user.profilePictureURL} class={twMerge('rounded-full w-14 h-14', avatarClass)} />
	<div class="space-y-1 font-medium dark:text-white">
		<div>
			{user.username}
		</div>
		{#if disableMyId}
			<div class="text-sm text-gray-500 dark:text-gray-400">
				{user.myId}
			</div>
		{/if}
	</div>
</button>
