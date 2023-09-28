<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import { Img, PaginationItem } from 'flowbite-svelte';
	import ImageJs, { type Image as ImageType } from 'image-js';
	import { onMount } from 'svelte';
	import Icon from '../Common/Icon.svelte';
	import IconRotate from '../Icons/IconRotate.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import { browser } from '$app/environment';
	import { elementIdGenerator, getDetailsByLatAndLong } from '@app/utils';
	import IconDrop from '$lib/components/Icons/IconDrop.svelte';
	import Filters from './Filters.svelte';
	import IconUndo from '../Icons/IconUndo.svelte';
	import { twMerge } from 'tailwind-merge';
	import ColorPicker from '../Common/ColorPicker.svelte';
	import imageSvelte from '@app/image-svelte';

	export let url: Base64 | string = '';
	export let placeName = '';

	const [imgUrl, Actions, ableToUndo] = imageSvelte();
	const actions = new Actions();
	actions.load(url);

	const texts = [`Location: ${placeName}`] as const;
	const labelElementId = elementIdGenerator();
	let labelElement: HTMLElement | null = null;
	onMount(() => (labelElement = document.getElementById(labelElementId)));
	let indexOfText = 0;
	let textColor = 'white';
	let changingTextColor = false;

	const locationLabel = () => {
		if (!labelElement) throw new Error('imageEditor: html element for label is not defined');
		const y = document.body.offsetHeight - 56;
		const x = document.body.offsetWidth / 2;

		actions.addText(texts[0], [x, y], {
			textAlign: 'center',
			textBaseline: 'bottom',
			font: '48px Sans Serif',
			color: 'white',
			maxWidth: 547
		});
	};
</script>

<div class="w-full h-full">
	<div
		class="absolute bg-black !fill-white rounded-[20px] right-0 w-min h-auto mt-32 p-2 flex flex-wrap flex-col justify-center items-center gap-4"
	>
		<Icon on:click={() => actions.rotate(90)} class=" text-4xl"><IconRotate /></Icon>
		<Icon on:click={() => locationLabel()} class=" text-4xl"><IconRotate /></Icon>

		<Filters on:click={(e) => actions.addFilter(e.detail)} />
		<Icon
			on:click={() => actions.undo()}
			disabled={!$ableToUndo}
			class={twMerge('text-4xl mt-4', !$ableToUndo ? 'fill-gray-500' : '')}><IconUndo /></Icon
		>
		<ColorPicker />
	</div>
	<img
		on:click={(e) => (changingTextColor = false)}
		class=" h-full object-contain"
		id="image"
		src={$imgUrl}
	/>

	{#if browser}
		<div class="absolute bottom-0 w-full left-0 mb-14">
			{#if changingTextColor}
				<ColorPicker bind:color={textColor} class="absolute z-50 top-0 left-0" />
			{/if}
			<Carousel bind:index={indexOfText} class="w-full" swiping>
				{#each texts as text}
					<button
						on:click={() => {
							changingTextColor = true;
						}}
						class="text-white text-5xl text-center pt-4 pb-4"
						><span id={labelElementId} style={`color: ${textColor}`}>{text}</span></button
					>
				{/each}
			</Carousel>
		</div>
	{/if}
</div>
