<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<div
	class={twMerge(
		'h-[20px] bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 animate-pulse',
		className
	)}
/>
<span class="sr-only">Skeleton loading</span>
