<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import { Button, Img, PaginationItem } from 'flowbite-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Icon from '../Common/Icon.svelte';
	import IconRotate from '../Icons/IconRotate.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import { browser } from '$app/environment';
	import Filters from './Filters.svelte';
	import IconUndo from '../Icons/IconUndo.svelte';
	import { twMerge } from 'tailwind-merge';
	import ColorPicker from '../Common/ColorPicker.svelte';
	import imageSvelte from '@app/image-svelte';
	import IconNext from '../Icons/IconNext.svelte';
	const dispatch = createEventDispatcher<{ next: string | Base64 }>();

	export let url: Base64 | string = '';
	export let placeName = '';

	const [imgUrl, Actions, ableToUndo] = imageSvelte();
	const actions = new Actions();
	actions.load(url);

	const texts = [`Location: ${placeName}`, `I was here, ${placeName}`] as const;
	const text = {
		index: 0,
		color: 'white'
	};
	let changingTextColor = false;

	const locationLabel = async () => {
		const ctx = await actions.getCtx();
		if (!ctx?.canvas.height) throw new Error('there is no height in canvas');

		const width = ctx?.canvas.width - 4;
		const height = 180;

		const x = 2;
		const y = ctx?.canvas.height - height;

		actions.addText(texts[text.index], {
			x: x,
			y: y,
			vAlign: 'middle',
			justify: false,
			fontSize: 54,
			fontStyle: '',
			debug: false,
			color: text.color,
			font: `'Poppins', sans-serif`,
			width: width,
			height: height
		});
	};

	const next = async () => {
		await locationLabel(); // add a location label into picture
		dispatch('next', $imgUrl);
	};
</script>

<div class="w-full h-full">
	<div
		class="absolute bg-black !fill-white rounded-[20px] right-0 w-min h-auto mt-32 p-2 flex flex-wrap flex-col justify-center items-center gap-4"
	>
		<Icon on:click={() => actions.rotate(90)} class=" text-4xl"><IconRotate /></Icon>

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
				<ColorPicker bind:color={text.color} class="absolute z-50 top-0 left-0" />
			{/if}
			<Carousel bind:index={text.index} class="w-full" swiping>
				{#each texts as label}
					<button
						on:click={() => {
							changingTextColor = true;
						}}
						class="text-white text-5xl text-center pt-4 pb-4"
						><span style={`color: ${text.color}`}>{label}</span></button
					>
				{/each}
			</Carousel>
		</div>
	{/if}
	<Button
		on:click={next}
		class="absolute flex flex-wrap flex-row gap-2 top-0 m-4 right-0 text-2xl pr-6 pl-6 rounded-full fill-white"
		color="blue">Next <Icon><IconNext /></Icon></Button
	>
</div>
