<script lang="ts">
	import ClickOutside from '$lib/components/Common/ClickOutside.svelte';
	import { twMerge } from 'tailwind-merge';
	import Carousel from '../../Carousel/Carousel.svelte';
	import ColorPicker from '../../Common/ColorPicker.svelte';

	export let options: {
		color: string;
		index: number;
		texts: string[];
	};

	let changeTextColor = false;
	let textElement: null | HTMLElement;

	export let textHeight: number = 0;
	$: textHeight =
		!textElement?.clientHeight || textHeight > textElement?.clientHeight
			? textHeight
			: textElement?.clientHeight;

	$: console.log(textElement?.clientHeight);

	let className = '';
	export { className as class };
</script>

<ClickOutside on:clickOutside={() => (changeTextColor = false)}>
	<div class={twMerge('absolute bottom-0 w-full left-0 p-2 mb-14', className)}>
		{#if changeTextColor}
			<ColorPicker bind:color={options.color} class="absolute z-50 top-0 left-0" />
		{/if}
		<Carousel bind:index={options.index} class="w-full" swiping>
			{#each options.texts as label}
				<button
					on:click={() => {
						changeTextColor = true;
					}}
					class="text-white text-5xl text-center pt-4 pb-4"
					><span bind:this={textElement} style={`color: ${options.color}`}>{label}</span></button
				>
			{/each}
		</Carousel>
	</div>
</ClickOutside>
