<script lang="ts">
	import type { UserInfo } from '@app/ts-types';
	import { Avatar } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let data: UserInfo;

	let className = '';
	export { className as class };
</script>

<button on:click class={twMerge('flex items-center space-x-4', className)}>
	<Avatar src={data.profilePictureURL} rounded />
	<div class="space-y-1 font-medium dark:text-white">
		<div>
			{data.username}
		</div>
		<div class="text-sm text-gray-500 dark:text-gray-400">
			{data.myId}
		</div>
	</div>
</button>
