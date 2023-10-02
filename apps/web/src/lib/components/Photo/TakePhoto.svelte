<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ShootButton from './ShootButton.svelte';
	import { browser } from '$app/environment';
	import Icon from '../Common/Icon.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { blobToBase64, elementIdGenerator } from '@app/utils';
	import imageSvelte from '@app/image-svelte';
	import DetectPinch from '../Common/DetectPinch.svelte';

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		image: { base64: string };
	}>();

	const videoElementId = elementIdGenerator();

	const [imgUrl, actions, ableToUndo] = imageSvelte({ howManyImagesBeforeUndoAvailable: 1 });

	$: videoElement = isLoading
		? null
		: (document.getElementById(videoElementId) as HTMLVideoElement);
	$: canvas = browser ? document.createElement('canvas') : undefined;

	let isLoading = true;
	export let facingMode: 'user' | 'environment' = 'user';

	$: mediaStreamConstraints = {
		video: {
			aspectRatio: 9 / 16,
			deviceId: cameraDeviceId,
			frameRate: { min: 1, max: 120, ideal: 120 },
			facingMode: facingMode,
			width: { ideal: browser ? document.body.offsetWidth : 0 },
			height: { ideal: browser ? document.body.offsetHeight : 0 }
		},
		audio: false
	} as MediaStreamConstraints;

	let cameraDevices: {
		user: MediaDeviceInfo;
		environment: MediaDeviceInfo;
	};
	let cameraDeviceId: string | undefined;
	let imageCapture: ImageCapture | undefined;
	let videoTrack: MediaStreamTrack | undefined;

	//
	$: if (!isLoading) startCamera();

	const startCamera = async () => {
		if (!videoElement) throw new Error('videoElement is not defined');
		const stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
		videoTrack = stream.getVideoTracks()[0];
		videoTrack.applyConstraints();
		imageCapture = new ImageCapture(videoTrack);
		if (videoElement) videoElement.srcObject = stream; //set video to video element
	};

	// get camera devices
	onMount(async () => {
		const devs = await navigator.mediaDevices.enumerateDevices();
		const vidDevs = devs.filter((device) => device.kind === 'videoinput');
		cameraDevices = {
			user: vidDevs.filter(
				(device) => device.label.includes('ace') || device.label.includes('ront') // ace = face, ront = front
			)[0],
			environment: vidDevs.filter(
				(device) => !device.label.includes('ace') && !device.label.includes('ront')
			)[0]
		};
		cameraDeviceId = cameraDevices[facingMode].deviceId;
	});

	const onLoad = (videoElement: HTMLVideoElement) => {
		isLoading = false;
	};

	const swapCameras = () => {
		// 		function switchCameras(track, camera) {
		//   const constraints = track.getConstraints();
		//   constraints.facingMode = camera;
		//   track.applyConstraints(constraints);
		// }
	};

	const takePicture = async () => {
		if (!canvas) throw new Error('canvas is not defined');
		if (!videoElement) throw new Error('videoElement is not defined');
		if (!imageCapture) throw new Error('imageCapture is not defined');

		const pictureBlob = await imageCapture.takePhoto();
		const pictureBitmap = await createImageBitmap(pictureBlob);

		drawCanvas(pictureBitmap);
		zoomIn();
	};

	const drawCanvas = async (pictureBitmap: ImageBitmap) => {
		if (!canvas) throw new Error('canvas is not defined');
		if (!videoElement) throw new Error('videoElement is not defined');

		const vHeight = videoElement.offsetHeight;
		const vWidth = videoElement.offsetWidth;

		canvas.height = vHeight;
		canvas.width = vWidth;

		canvas.getContext('2d')?.clearRect(0, 0, pictureBitmap.width, pictureBitmap.height);

		canvas
			.getContext('2d')
			?.drawImage(
				pictureBitmap,
				(pictureBitmap.width - vWidth) / 2,
				(pictureBitmap.height - vHeight) / 2,
				vWidth,
				vHeight,
				0,
				0,
				vWidth,
				vHeight
			);

		const base64 = await canvas.toDataURL('image/png');

		if (facingMode === 'user') {
			await actions.load(base64);
			actions.flipX();
		}

		console.log('finally');

		//send(base64);
	};

	const send = (base64: string) => {
		dispatch('image', {
			base64: base64
		});
	};

	const zoomIn = () => {
		const capabilities = videoTrack?.getCapabilities();
		console.log(capabilities);
		if (!capabilities || (capabilities && !('zoom' in capabilities))) {
			console.log('your cam cant zoom');

			return;
		} // i cant zoom in this browser

		videoTrack?.applyConstraints({ advanced: [{ zoom: 1 }] });
	};
</script>

<DetectPinch on:zoomIn={zoomIn} class="h-full w-full relative flex justify-center items-center">
	{#if isLoading}
		<div class="z-50">
			<SyncLoader color="black" size={60} />
		</div>
	{/if}
	<video
		autoplay
		id={videoElementId}
		use:onLoad
		class={twMerge(
			'h-full object-cover absolute',
			isLoading && 'blur-sm',
			facingMode === 'user' ? 'scale-x-[-1]' : '',
			className
		)}
	>
		<track kind="captions" />
	</video>

	<div class="absolute bottom-0 mb-24 flex justify-center items-center w-full">
		<ShootButton class="active:animate-ping" on:click={takePicture} />
		{#if cameraDevices && cameraDevices.user && cameraDevices.environment}
			<Icon
				on:click={swapCameras}
				icon="fas fa-sync-alt"
				class="text-4xl absolute right-0 m-14 active:animate-ping"
			/>
		{/if}
	</div>
</DetectPinch>
