<script lang="ts">
	import { goto } from '$app/navigation';
	import { Avatar } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let icon: string | URL | null = null;
	export let outlineOnly: boolean = false;
	export let disabled = false;
	export let disableDefaultDarkMode = false;

	let className: string = '';
	export { className as class };
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
	{disabled}
	on:mouseover
	on:mouseout
	on:touchstart
	on:touchend
	on:click
	class={twMerge(
		'w-min h-min flex justify-center items-center',
		!disableDefaultDarkMode && 'dark:text-white text-black fill-black dark:fill-white',
		className
	)}
>
	{#if typeof icon === 'string' && icon.startsWith('http')}
		<Avatar src={icon} size="md" />
	{:else if typeof icon === 'string'}
		<i class:outlineOnly class={twMerge(icon, 'flex justify-self-start')} />
	{/if}
	<slot />
</button>

<style>
	i,
	i::before {
		font-size: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.outlineOnly {
		color: white;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}
</style>
