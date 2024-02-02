<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import { base64ToFile } from '@app/utils';
	import '@capacitor-community/camera-preview';
	import {
		CameraPreview,
		type CameraPreviewOptions,
		type CameraSampleOptions
	} from '@capacitor-community/camera-preview';
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import Card from '../Common/Card.svelte';
	import Center from '../Common/Center.svelte';
	import Loading from '../Common/Loading.svelte';
	import Row from '../Common/Row.svelte';
	import FlipCameraButton from './FlipCameraButton.svelte';
	import ShootButton from './ShootButton.svelte';

	const dispatch = createEventDispatcher<{ image: { base64: Base64; file: File } }>();

	export let isLoading = true;
	export let quality = 100;
	export let aspectRatio = 3 / 5;
	export let cameraPosition: 'rear' | 'front' = 'rear';

	const onLoad = async () => {
		const windowWidth = document.body.clientWidth;
		const windowHeight = document.body.clientHeight;

		const cameraPreviewOptions: CameraPreviewOptions = {
			position: cameraPosition,
			height: windowWidth * aspectRatio * 2,
			width: windowWidth * 2,
			parent: 'cameraPreview',
			className: 'cameraPreview',
			enableZoom: true,
			enableHighResolution: false,
			lockAndroidOrientation: true
		};

		await CameraPreview.start(cameraPreviewOptions);
		isLoading = false;
	};

	onMount(onLoad);

	const shoot = async () => {
		const cameraPreviewPictureOptions: CameraSampleOptions = {
			quality: quality
		};

		const result = await CameraPreview.captureSample(cameraPreviewPictureOptions);
		const base64PictureData = result.value;
		const file = base64ToFile(base64PictureData, 'picture.jpg');
		dispatch('image', { base64: base64PictureData, file: file });
	};

	const flipCamera = async () => {
		cameraPosition = cameraPosition === 'front' ? 'rear' : 'front';
		await CameraPreview.stop();
		onLoad();
	};

	let className = '';
	export { className as class };
</script>

<Card
	class={twMerge(
		'!p-[0px] flex justify-center items-center mobile:w-full h-full rounded-none shadow-none !gap-2',
		className
	)}
>
	{#if isLoading}
		<Center class="h-[calc(100%-70px)] w-full">
			<Loading type="circle3" />
		</Center>
	{/if}
	<div id="cameraPreview" class="relative !h-auto" />
	<Row class=" justify-center items-center relative w-full h-[60px] ">
		<ShootButton on:click={shoot} class="" />
		<FlipCameraButton on:click={flipCamera} class="absolute right-0  mr-2 ml-2" />
	</Row>
</Card>

<style>
	:global(video) {
		border-radius: 22px !important;
	}
</style>
