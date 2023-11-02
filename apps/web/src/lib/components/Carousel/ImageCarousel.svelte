<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	// @ts-ignore
	import type { CarouselImage } from './types';
	import { twMerge } from 'tailwind-merge';
	import Carousel from './Carousel.svelte';

	const dispatch = createEventDispatcher();

	export let images: CarouselImage[];

	export let autoplay: boolean = images.length > 1 ? true : false;
	export let arrows: boolean = false;
	export let pauseOnFocus: boolean = true;
	export let dots: boolean = images.length > 1 ? true : false;
	export let swiping: boolean = images.length > 1 ? true : false;
	export let timingFunction: string = 'ease-in-out';
	export let autoplayDuration: number = 3000;
	export let index: number = 0;

	let className = '';
	export { className as class };

	$: if (index > images?.length - 1 || index < 0) index = 0;

	//change dispatch
	$: dispatch('change', {
		index: index,
		image: images[index]
	});
</script>

<div class={twMerge('h-auto w-full', className)}>
	<Carousel {arrows} {pauseOnFocus} {dots} {swiping} {timingFunction} {autoplay} {autoplayDuration}>
		{#each images as { imgurl }}
			<Img class={`!min-h-[250px] rounded-xl object-cover`} src={imgurl} />
		{/each}
	</Carousel>
</div>
