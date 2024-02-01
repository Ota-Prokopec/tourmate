<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import '@capacitor-community/camera-preview';
	import {
		CameraPreview,
		type CameraPreviewOptions,
		type CameraSampleOptions
	} from '@capacitor-community/camera-preview';
	import { createEventDispatcher, onMount } from 'svelte';
	import Card from '../Common/Card.svelte';
	import Row from '../Common/Row.svelte';
	import FlipCameraButton from './FlipCameraButton.svelte';
	import ShootButton from './ShootButton.svelte';
	import { twMerge } from 'tailwind-merge';
	import { base64ToFile, device, fileToBase64 } from '@app/utils';
	import MediaQuery from '../MediaQueries/MediaQuery.svelte';
	import TakePhotoFromPhone from './TakePhotoFromPhone.svelte';
	import { navigate } from '$lib/utils/navigator';
	import Center from '../Common/Center.svelte';
	import Loading from '../Common/Loading.svelte';

	const dispatch = createEventDispatcher<{ image: { base64: Base64; file: File } }>();

	export let isLoading = true;
	export let quality = 100;

	onMount(async () => {
		const windowWidth = document.body.clientWidth;
		const windowHeight = document.body.clientHeight;

		const cameraPreviewOptions: CameraPreviewOptions = {
			position: 'front',
			height: windowHeight - 70,
			width: windowWidth,
			parent: 'cameraPreview',
			className: 'cameraPreview',
			enableZoom: true,
			enableHighResolution: false
		};
		await CameraPreview.start(cameraPreviewOptions);
		isLoading = false;
	});

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
		CameraPreview.flip();
	};

	let className = '';
	export { className as class };
</script>

{#if device.recognizeWidth() !== 'mobile'}
	<TakePhotoFromPhone
		on:cancel={() => navigate(-1)}
		on:image={async (e) => {
			dispatch('image', { base64: await fileToBase64(e.detail), file: e.detail });
		}}
	/>
{/if}

<MediaQuery class="w-full h-full" size="mobile">
	<Card
		class={twMerge(
			'!p-[0px] flex justify-center items-center mobile:w-full h-full rounded-none shadow-none',
			className
		)}
	>
		{#if isLoading}
			<Center class="h-[calc(100%-70px)] w-full">
				<Loading type="circle3" />
			</Center>
		{/if}
		<div id="cameraPreview" class="relative !h-[calc(100%-70px)]" />
		<Row class="mt-[2px] justify-center items-center relative w-full h-[60px] ">
			<ShootButton on:click={shoot} class="" />
			<FlipCameraButton on:click={flipCamera} class="absolute right-0  mr-2 ml-2" />
		</Row>
	</Card>
</MediaQuery>

<style>
	:global(video) {
		border-radius: 22px !important;
	}
</style>
