<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import imageSvelte, { type Actions } from '@app/image-svelte';
	import Tools from './items/Tools.svelte';
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
	import { createEventDispatcher, onMount } from 'svelte';
	import { omit, pick } from 'lodash';
	const dispatch = createEventDispatcher<{
		change: { url: string | Base64; width: number; height: number };
	}>();

	let imageElement: HTMLImageElement | undefined;
	export let url: Base64 | string | string | URL = '';
	export let result: string | Base64 = '';
	const imgUrl = writable<string | Base64>(url as string);
	$: result = $imgUrl;

	let isLoading = true;
	onMount(() => (isLoading = false));

	const defaultOptions: EditorOptions = {
		allowCropping: true,
		allowRotating: true,
		allowFilters: true,
		allowUndo: true,
		cropping: {
			cropOnStart: { disableUserToDisableCropping: true }
		}
	};
	export let options: EditorOptions = defaultOptions;

	let imageParams:
		| {
				width: number;
				height: number;
		  }
		| undefined;

	$: if ($historyStore[0] && $historyStore[0]?.width && $historyStore[0]?.height) {
		imageParams = pick($historyStore[0], 'width', 'height');
	}

	const [actions, ableToUndo, historyStore] = imageSvelte(
		{
			howManyImagesBeforeUndoAvailable: options.cropping?.cropOnStart?.disableUserToDisableCropping
				? 1
				: 1
		},
		(url, options, action, history, imageJs) => {
			if (!imageElement) throw new Error('imageElement is not defined');
			const resizeH = document.body.clientHeight - imageElement?.clientHeight;
			const resizeW = document.body.clientWidth - imageElement?.clientWidth;

			const resize = imageJs.height > imageJs.width ? resizeW : resizeH;

			if (action !== 'rotate') {
				imgUrl.set(url);
			} else {
				// i do this because that i got on phone where, is height bigger that width, a width value to make both sides (x, y) larger by adding there a width value because if i added a height image would be full-height screen but too big to width....
				// on computer where is height smaller that width i do an opposite
				// always resize picture that it was full-screen
				const croppedUrl = imageJs
					.resize({ width: imageJs.width + resize, height: imageJs.height + resize })
					.getCanvas()
					.toDataURL('image/png');
				imgUrl.set(croppedUrl);
			}

			if (history.length === 1) return; //! this is init load image, this number refers to howManyImagesBeforeUndoAvailable
			dispatch('change', { url: $imgUrl, ...options });
		}
	);
	$: actions.load(url as string);

	const cropper = myCropper(options.cropping, (img) => {
		if (!imageParams?.width || !imageParams?.height)
			throw new Error('width and height are not set');

		actions.loadCanvas(img.getCanvas());
	});

	let cropperScreened = false;
	const screenCropper = async () => {
		cropperScreened = true;
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

	$: if (!isLoading && options.cropping?.cropOnStart) screenCropper(); // crop on start

	let className = '';
	export { className as class };
</script>

<Row
	class={twMerge(
		'w-full h-full grid grid-rows-[auto_64px] relative overflow-auto items-center justify-center',
		className
	)}
>
	{#if cropperScreened}
		<Row class="gap-2 absolute right-0 top-0 mt-2 mr-20 z-50 fill-white text-3xl flex-1">
			<Icon class="fill-black" on:click={crop}><IconCheck /></Icon>
			{#if !($historyStore.length <= 1 && options.cropping?.cropOnStart?.disableUserToDisableCropping)}
				<Icon class="fill-black" on:click={disableCropper}><IconTimes /></Icon>
			{/if}
		</Row>
	{/if}

	<Tools
		on:crop={() => screenCropper()}
		on:rotate={() => actions.rotate(90)}
		on:filter={(e) => actions.addFilter(e.detail)}
		on:undo={() => actions.undo()}
		ableToUndo={$ableToUndo}
	>
		<slot name="tools" />
	</Tools>

	<button
		class="relative appearance-none p-0 m-0 h-min flex items-center justify-center self-center"
	>
		<img
			bind:this={imageElement}
			class="max-w-[100vw] max-h-[100vh]"
			alt=""
			id="image"
			src={$imgUrl}
		/>
		<slot name="inner" />
	</button>

	<div class="absolute bottom-0 right-0 p-0 m-0 w-full">
		<slot name="bottom" />
	</div>
</Row>
