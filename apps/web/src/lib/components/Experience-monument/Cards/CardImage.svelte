<script lang="ts">
	import Img from '$lib/components/Common/Img.svelte';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher<{ like: undefined }>();

	export let imgSrc: string | URL | null | undefined;

	let className = '';
	export { className as class };
</script>

{#if imgSrc}
	<button
		class={twMerge('h-auto w-full relative', className)}
		on:dblclick={() => {
			dispatch('like');
		}}
	>
		<Img class={twMerge('rounded-lg object-cover w-full')} src={imgSrc} />
		<slot />
	</button>
{/if}
