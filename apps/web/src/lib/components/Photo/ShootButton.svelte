<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<Button
	on:click
	class={twMerge('bg-red-500 rounded-full w-16 h-16 z-50 border-[10px] border-white ', className)}
/>
