<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Icon from './Icon.svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ dismiss: undefined }>();

	export let dismissable = false;
	export let disable = false;

	const dismiss = () => {
		disable = true;
		dispatch('dismiss');
	};

	let className = '';
	export { className as class };
</script>

{#if !disable}
	<Card class={twMerge('relative', className)}>
		{#if dismissable}
			<Icon on:click={dismiss} class="absolute right-0 top-0 m-2 hover:bg-blue-300 rounded-lg">
				<IconTimes class="w-8 h-8" />
			</Icon>
		{/if}

		<button on:click class="w-full h-full">
			<slot />
		</button>
	</Card>
{/if}
