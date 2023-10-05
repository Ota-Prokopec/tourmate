<script lang="ts">
	import ClickOutside from '$lib/components/Common/ClickOutside.svelte';
	import Carousel from '../../Carousel/Carousel.svelte';
	import ColorPicker from '../../Common/ColorPicker.svelte';

	export let options: {
		color: string;
		index: number;
		texts: string[];
	};

	let changeTextColor = false;
</script>

<ClickOutside on:clickOutside={() => (changeTextColor = false)}>
	<div class="absolute bottom-0 w-full left-0 mb-14">
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
					><span style={`color: ${options.color}`}>{label}</span></button
				>
			{/each}
		</Carousel>
	</div>
</ClickOutside>
