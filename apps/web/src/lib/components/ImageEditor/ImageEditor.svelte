<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import { Button, Img, PaginationItem } from 'flowbite-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Icon from '../Common/Icon.svelte';
	import IconRotate from '../Icons/IconRotate.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import { browser } from '$app/environment';
	import IconUndo from '../Icons/IconUndo.svelte';
	import { twMerge } from 'tailwind-merge';
	import ColorPicker from '../Common/ColorPicker.svelte';
	import imageSvelte from '@app/image-svelte';
	import IconNext from '../Icons/IconNext.svelte';
	import Bar from './items/Bar.svelte';
	import LocationTextInput from './items/LocationTextInput.svelte';
	import Edge from './items/Edge.svelte';

	const dispatch = createEventDispatcher<{ next: string | Base64 }>();

	export let url: Base64 | string = '';
	export let placeName = '';

	const [imgUrl, Actions, ableToUndo] = imageSvelte();
	const actions = new Actions();
	actions.load(url);

	const texts = [`Location: ${placeName}`, `I was here, ${placeName}`];
	const textOptions = {
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
	const crop = () => {
		actions.flipX();
	};
</script>

<div class="w-full h-full flex justify-center">
	<div class="w-auto h-full flex flex-wrap flex-row">
		<Edge />

		<Bar
			on:rotate={() => actions.rotate(90)}
			on:filter={(e) => actions.addFilter(e.detail)}
			on:undo={() => actions.undo()}
			ableToUndo={$ableToUndo}
		/>

		<button
			on:click={(e) => (changingTextColor = false)}
			class="relative appearance-none p-0 m-0 h-min"
		>
			<img class="" alt="" id="image" src={$imgUrl} />
			{#if browser}
				<LocationTextInput {texts} options={textOptions} />
			{/if}
		</button>

		<Edge>
			<Button
				on:click={next}
				class="h-14 flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl pr-6 pl-6 m-2 rounded-full fill-white"
				color="blue">Next <Icon><IconNext /></Icon></Button
			>
		</Edge>
	</div>
</div>
