<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// @ts-ignore
	import Carousel from 'svelte-carousel';
	import { twMerge } from 'tailwind-merge';
	import type { CarouselFunctions } from './types';
	const dispatch = createEventDispatcher<{ change: { index: number } }>();

	export let autoplay = false;
	export let arrows: boolean = false;
	export let pauseOnFocus: boolean = true;
	export let dots = false;
	export let swiping = false;
	export let timingFunction: string = 'ease-in-out';
	export let autoplayDuration: number = 3000;
	export let index: number = 0;

	export let carousel: CarouselFunctions | undefined = undefined;

	$: dispatch('change', { index });

	const onChange = (e: { detail: number }) => {
		index = e.detail;
	};

	let className = '';
	export { className as class };
</script>

<div class={twMerge('h-auto w-full', className)}>
	<Carousel
		class="w-full h-full"
		{arrows}
		{pauseOnFocus}
		{dots}
		{swiping}
		{timingFunction}
		{autoplay}
		{autoplayDuration}
		initialPageIndex={index}
		bind:this={carousel}
		on:pageChange={onChange}
		on:pageChange
	>
		<slot />
	</Carousel>
</div>
