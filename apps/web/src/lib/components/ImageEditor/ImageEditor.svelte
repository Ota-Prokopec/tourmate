<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import { Img, PaginationItem } from 'flowbite-svelte';
	import ImageJs, { type Image as ImageType } from 'image-js';
	import { onMount } from 'svelte';
	import Icon from '../Common/Icon.svelte';
	import IconRotate from '../Icons/IconRotate.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import { browser } from '$app/environment';
	import { getDetailsByLatAndLong } from '@app/utils';
	import IconDrop from '$lib/components/Icons/IconDrop.svelte';
	import Filters from './Filters.svelte';
	import IconUndo from '../Icons/IconUndo.svelte';
	import { twMerge } from 'tailwind-merge';
	import ColorPicker from '../Common/ColorPicker.svelte';
	import imageSvelte from '@app/image-svelte';

	export let imgUrl: Base64 | string = '';
	export let placeName = '';

	let history: ImageJs[] = [];
	let ableToUndo = false;

	const [image, actions] = imageSvelte(image);

	const add = () => {
		if (!image) throw new Error('Image is not available');
		history = [...history, image];
		ableToUndo = history.length > 1;
		imgUrl = getBase64();
	};

	const undo = () => {
		if (!ableToUndo) throw new Error('not able to undo');

		history = history.splice(0, history.length - 1);
		ableToUndo = history.length > 1;

		const potencialUndidImage = history.at(-1);

		if (potencialUndidImage) image = potencialUndidImage;
		else throw new Error('not able to undo');

		imgUrl = getBase64();
	};

	let image: ImageType | null;

	onMount(async () => {
		image = await ImageJs.load(imgUrl);
		image = image.resize({ height: document.body.offsetHeight, width: document.body.offsetWidth });
		add();

		const centerX = document.body.offsetWidth / 2;

		addText(texts[0], [centerX, 200]);
	});

	const getCtx = () => {
		if (!image) throw new Error('Image is not available');
		const canvas = image.getCanvas();
		const ctx = canvas.getContext('2d');
		return ctx;
	};

	const getBase64 = () => {
		if (!image) throw new Error('Image is not available');
		return image.toDataURL('image/png');
	};

	const rotate = () => {
		if (!image) throw new Error('Image is not available');
		image = image.rotate(90);
		add();
	};

	const addText = async (text: string, position: [number, number], color?: string) => {
		if (!image) throw new Error('Image is not available');
		const ctx = getCtx();
		if (!ctx) throw new Error('Ctx is not available');

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '40px Arial';
		ctx.fillStyle = 'red';
		ctx.imageSmoothingEnabled = false;
		ctx.fillText('ahoj', ...position);
		image = await ImageJs.load(ctx.canvas.toDataURL('image/png'));
		add();
	};

	const filters = {
		blur: () => {
			if (!image) throw new Error('Image is not available');
			image = image.blurFilter({ radius: 1 });
			add();
		},
		median: () => {
			if (!image) throw new Error('Image is not available');
			image = image.medianFilter();
			add();
		},
		sobel: () => {
			if (!image) throw new Error('Image is not available');
			image = image.sobelFilter();
			add();
		},
		scharr: () => {
			if (!image) throw new Error('Image is not available');
			image = image.scharrFilter();
			add();
		},
		gaussian: () => {
			if (!image) throw new Error('Image is not available');
			image = image.gaussianFilter();
			add();
		}
	};

	const texts = [`Location: ${placeName}`] as const;
	let indexOfText = 0;
	let textColor = 'white';
	let changingTextColor = false;
</script>

<div class="w-full h-full">
	<div
		class="absolute bg-black !fill-white rounded-[20px] right-0 w-min h-auto mt-32 p-2 flex flex-wrap flex-col justify-center items-center gap-4"
	>
		<Icon on:click={rotate} class=" text-4xl"><IconRotate /></Icon>

		<Filters on:click={(e) => filters[e.detail]()} />
		<Icon
			disabled={!ableToUndo}
			on:click={undo}
			class={twMerge('text-4xl mt-4', !ableToUndo ? 'fill-gray-500' : '')}><IconUndo /></Icon
		>
		<ColorPicker />
	</div>
	<img
		on:click={(e) => (changingTextColor = false)}
		class=" h-full object-contain"
		id="image"
		src={imgUrl}
	/>

	{#if browser}
		<div class="absolute bottom-0 w-full left-0 mb-14">
			{#if changingTextColor}
				<ColorPicker bind:color={textColor} class="absolute z-50 top-0 left-0" />
			{/if}
			<Carousel bind:index={indexOfText} class=" w-full " swiping>
				{#each texts as text}
					<button
						on:click={() => {
							changingTextColor = true;
						}}
						class="text-white text-5xl text-center pt-4 pb-4"
						><span style={`color: ${textColor}`}>{text}</span></button
					>
				{/each}
			</Carousel>
		</div>
	{/if}
</div>
