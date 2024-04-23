<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Icon from './Icon.svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ dismiss: undefined }>();

	export let dismissable = false;
	export let disabled = false;
	export let href: string | undefined = undefined;

	const dismiss = () => {
		dispatch('dismiss');
		disabled = true;
	};

	let className = '';
	export { className as class };
</script>

{#if !disabled}
	<Card
		{href}
		on:click
		padding="md"
		class={twMerge('relative !gap-0 h-auto mobile:max-w-none cursor-pointer', className)}
	>
		{#if dismissable}
			<div class="w-full h-auto flex justify-end gap-2">
				<slot name="dismissArea" />
				<Icon on:click={dismiss} class="relative right-0 top-0 m-1 hover:bg-blue-300 rounded-lg">
					<IconTimes class="w-8 h-8" />
				</Icon>
			</div>
		{/if}

		<slot />
	</Card>
{/if}
