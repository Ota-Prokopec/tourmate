<script lang="ts">
	import { colors } from '@app/utils';
	import HorizontalSlider from '../Inputs/Slider/HorizontalSlider.svelte';
	import VerticalSlider from '../Inputs/Slider/VerticalSlider.svelte';
	export let value = 0;
	export let color: string = colors[0];
	let max = colors.length;
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';

	$: color = colors[value];

	let className = '';
	export { className as class };
</script>

{#if orientation === 'horizontal'}
	<HorizontalSlider class={className} min={1} {max} bind:value />
{:else}
	<VerticalSlider class={className} min={1} {max} bind:value />
{/if}
