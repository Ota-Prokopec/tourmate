<script lang="ts">
	// @ts-ignore
	import Carousel from 'svelte-carousel';
	import { twMerge } from 'tailwind-merge';

	export let autoplay = false;
	export let arrows: boolean = false;
	export let pauseOnFocus: boolean = true;
	export let dots = false;
	export let swiping = false;
	export let timingFunction: string = 'ease-in-out';
	export let autoplayDuration: number = 3000;
	export let index: number = 0;
	export let style = '';

	let className = '';
	export { className as class };
</script>

<div {style} class={twMerge('h-auto w-full', className)}>
	<Carousel
		class="w-full h-full"
		{arrows}
		{pauseOnFocus}
		{dots}
		{swiping}
		{timingFunction}
		{autoplay}
		{autoplayDuration}
	>
		<slot />
	</Carousel>
</div>
