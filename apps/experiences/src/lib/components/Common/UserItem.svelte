<script lang="ts">
	import { Base64 } from '@app/ts-types';
	import { Avatar } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let imgSrc: string | Base64;

	let className = '';
	export { className as class };
</script>

<div class={twMerge('flex items-center space-x-4', className)}>
	<Avatar src={imgSrc} rounded />
	<div class="space-y-1 font-medium dark:text-white">
		<div>
			<slot name="username" />
		</div>
		<div class="text-sm text-gray-500 dark:text-gray-400">
			<slot name="myId" />
		</div>
	</div>
</div>
