<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' = 'p';

	let className = '';
	export { className as class };
</script>

<svelte:element this={tag} class={twMerge('break-normal text-black dark:text-white', className)}>
	<slot />
</svelte:element>
