<script lang="ts">
	import { elementIdGenerator } from '@app/utils';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let disabled: boolean = false;

	export let reactiveToEnterKey: boolean = false;

	const id = elementIdGenerator();

	let className = '';
	export { className as class };
	export let classForDisabled = '';

	onMount(() => {
		const button = document.getElementById(id);
		if (!button) return;
		if (reactiveToEnterKey)
			window.addEventListener('keypress', (e) => {
				if (e.code === 'Enter') button.click();
			});
	});
</script>

{#if !disabled}
	<Button
		{id}
		class={twMerge(
			'  flex justify-center items-center text-white bg-blue-500 p-4 pl-8 pr-8 text-xl font-bold',
			className
		)}
		on:click
	>
		<slot />
	</Button>
{:else}
	<Button
		{id}
		disabled
		class={twMerge(
			' flex justify-center items-center bg-slate-700 text-white p-4 pl-8 pr-8 text-xl font-bold',
			className,
			classForDisabled
		)}
	>
		<slot />
	</Button>
{/if}
