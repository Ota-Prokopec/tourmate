<script lang="ts">
	import { goto } from '$app/navigation';
	import { Avatar } from 'flowbite-svelte';

	export let link: string = '';
	export let icon: string | URL;
	export let outlineOnly: boolean = false;

	let className: string = '';
	export { className as class };

	export let click = () => {
		goto(link);
	};
</script>

<button
	on:click
	on:click={click}
	class={`w-min h-min flex justify-center items-center ${className}`}
>
	{#if typeof icon === 'string' && icon.startsWith('http')}
		<Avatar src={icon} size="md" />
	{:else}
		<i class:outlineOnly class={icon + '  flex justify-self-start'} />
	{/if}
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
