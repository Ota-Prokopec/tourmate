<script lang="ts">
	import type { UserInfo } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import Avatar from './Avatar.svelte';

	export let user: UserInfo;
	export let disableMyId = false;

	let className = '';
	export { className as class };
</script>

<button on:click class={twMerge('flex items-center space-x-4', className)}>
	<Avatar src={user.profilePictureURL} class="rounded-full w-auto h-full" />
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
