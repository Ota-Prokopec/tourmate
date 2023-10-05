<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '../../Common/Icon.svelte';
	import IconRotate from '../../Icons/IconRotate.svelte';
	import IconUndo from '../../Icons/IconUndo.svelte';
	import type { Filter } from '@app/image-svelte';
	import { twMerge } from 'tailwind-merge';
	import ColorPicker from '../../Common/ColorPicker.svelte';
	import Filters from './Filters.svelte';
	import IconCrop from '$lib/components/Icons/IconCrop.svelte';
	const dispatch = createEventDispatcher<{
		rotate: number;
		filter: Filter;
		undo: undefined;
		crop: undefined;
	}>();

	export let ableToUndo: boolean;

	let className = '';
	export { className as class };
</script>

<div
	class={twMerge(
		'absolute bg-black !fill-white rounded-[20px] right-0 top-0 w-min h-auto mt-8 p-2 flex flex-wrap flex-col justify-center items-center gap-4 z-50',
		className
	)}
>
	<Icon on:click={() => dispatch('rotate', 90)} class=" text-4xl"><IconRotate /></Icon>

	<Icon
		on:click={() => {
			dispatch('crop');
		}}
		class="text-5x"><IconCrop /></Icon
	>

	<Filters on:click={(e) => dispatch('filter', e.detail)} />
	<Icon
		on:click={() => dispatch('undo')}
		disabled={!ableToUndo}
		class={twMerge('text-4xl mt-4', !ableToUndo ? 'fill-gray-500' : '')}><IconUndo /></Icon
	>
	<ColorPicker />
</div>
