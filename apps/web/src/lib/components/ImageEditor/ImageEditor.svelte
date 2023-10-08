<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import imageSvelte from '@app/image-svelte';
	import Bar from './items/Bar.svelte';
	import Edge from './items/Edge.svelte';
	import Icon from '../Common/Icon.svelte';
	import Cropperjs from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import Row from '../Common/Row.svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import IconCheck from '../Icons/IconCheck.svelte';
	import type { EditorOptions } from './items/ImageEditorTypes';
	import { twMerge } from 'tailwind-merge';
	import myCropper from './utils/cropper';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let url: Base64 | string | string | URL = '';
	export let result: string | Base64 = '';
	const imgUrl = writable<string | Base64>(url as string);
	imgUrl.subscribe((value) => (result = value));

	const defaultOptions: EditorOptions = {
		allowCropping: true,
		allowRotating: true,
		allowFilters: true,
		allowUndo: true,
		cropping: {
			minCanvasWidth: 1,
			minCanvasHeight: 1,
			aspectRatio: 1,
			minContainerWidth: 1,
			minContainerHeight: 1,
			minCropBoxWidth: 1,
			minCropBoxHeight: 1,
			cropOnStart: { disableDisabling: false }
		}
	};
	export let options: EditorOptions = defaultOptions;

	//options = { ...defaultOptions, ...options }; // mix your options into one where will be all of them

	let imageElement: HTMLImageElement | undefined;
	const [actions, ableToUndo] = imageSvelte({ howManyImagesBeforeUndoAvailable: 1 }, (url) => {
		imgUrl.set(url);
	});
	actions.load(url as string);

	const cropper = myCropper(options.cropping, (img) => {
		actions.load(img.getCanvas().toDataURL('image/png'));
	});

	let cropperScreened = false;
	const screenCropper = async (
		options: { disableDisabling: boolean } | undefined = { disableDisabling: false }
	) => {
		if (!options?.disableDisabling) cropperScreened = true;
		if (!imageElement) throw new Error('imageElement is not defined');
		await cropper.screen(imageElement);
	};

	const crop = () => {
		if (!cropper) throw new Error('cropper is not defined');
		cropper.crop();
		disableCropper();
	};

	const disableCropper = () => {
		if (!cropper) throw new Error('cropper is not defined');
		cropper.destroy();
		cropperScreened = false;
	};

	onMount(() => {
		if (options.cropping?.cropOnStart) screenCropper({ disableDisabling: false });
	});

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-full h-full flex justify-center', className)}>
	<div class="w-auto h-full flex flex-wrap flex-row">
		<Edge />

		{#if cropperScreened}
			<Row class="gap-2 absolute right-0 top-0 mt-2 mr-20 z-50 fill-white text-3xl">
				<Icon on:click={crop}><IconCheck /></Icon>
				<Icon on:click={disableCropper}><IconTimes /></Icon>
			</Row>
		{/if}

		<Bar
			on:crop={() => screenCropper()}
			on:rotate={() => actions.rotate(90)}
			on:filter={(e) => actions.addFilter(e.detail)}
			on:undo={() => actions.undo()}
			ableToUndo={$ableToUndo}
		/>

		<button
			class="relative appearance-none p-0 m-0 h-min flex items-center justify-center w-full self-center"
		>
			<img bind:this={imageElement} class="" alt="" id="image" src={$imgUrl} />
			<slot name="inner" />
		</button>

		<Edge>
			<slot name="bottom" />
		</Edge>
	</div>
</div>
