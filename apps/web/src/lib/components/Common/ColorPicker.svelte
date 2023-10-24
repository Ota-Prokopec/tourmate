<script lang="ts">
	import { getDarkAndLightColors } from '@app/utils';
	import Range from './Range.svelte';

	const colors = getDarkAndLightColors();

	export let value = 0;
	let style: 'light' | 'dark' = 'light';
	export let color: string = colors[style][0];
	let max = colors.light.length;
	export let orientation: 'vertical' | 'horizontal' = 'vertical';

	$: color = colors[style][value];

	let className = '';
	export { className as class };
</script>

<Range class={className} min={1} {orientation} {max} bind:value />
