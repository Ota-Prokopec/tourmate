<script lang="ts">
	import Card from '$lib/components/Common/Card.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Full from '$lib/components/Common/Full.svelte';
	import Img from '$lib/components/Common/Img.svelte';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher<{ like: undefined }>();

	export let imgSrc: string | URL | null | undefined;
	export let fullScreen = false;

	let className = '';
	export { className as class };
</script>

{#if imgSrc}
	{#if fullScreen}
		<Card
			dismissable
			on:dismiss={() => (fullScreen = false)}
			class="h-full !w-full !fixed top-0 left-0 max-w-none z-[100] "
		>
			<Img class="w-full h-full object-contain" src={imgSrc} />
		</Card>
	{/if}

	<button
		on:click={() => (fullScreen = true)}
		class={twMerge('h-auto w-full relative', className)}
		on:dblclick={() => {
			dispatch('like');
		}}
	>
		<Img class={twMerge('rounded-lg object-cover w-full')} src={imgSrc} />
		<slot />
	</button>
{/if}
