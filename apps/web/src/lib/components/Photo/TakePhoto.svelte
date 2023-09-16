<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ShootButton from './ShootButton.svelte';
	import { browser } from '$app/environment';
	import Icon from '../Common/Icon.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { elementIdGenerator } from '@app/utils';

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		image: { base64: string };
	}>();

	const id = elementIdGenerator();

	$: videoElement = isLoading ? null : (document.getElementById(id) as HTMLVideoElement);
	$: canvas = browser ? document.createElement('canvas') : null;

	let isLoading = true;
	export let facingMode: 'user' | 'environment' = 'user';
	$: mediaStreamConstraints = {
		video: {
			aspectRatio: 16 / 9,
			deviceId: cameraDeviceId,
			frameRate: { min: 1, max: 120, ideal: 120 },
			facingMode: facingMode,
			width: browser ? document.body.offsetWidth : 1080,
			height: browser ? document.body.offsetHeight : 720
		},
		audio: false
	} as MediaStreamConstraints;

	let cameraDevices: {
		user: MediaDeviceInfo;
		environment: MediaDeviceInfo;
	};
	let cameraDeviceId: string | undefined;

	$: if (!isLoading) startCamera(true);

	const startCamera = async (setUp: boolean) => {
		const stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
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

	function takePicture() {
		if (!canvas) throw new TypeError('canvas is null');
		if (!videoElement) throw new TypeError('videoElement is not null');

		var context = canvas.getContext('2d')!;

		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;

		if (facingMode === 'user') {
			//rotate picture y-axis

			let { width, height } = canvas;
			Object.assign(context.canvas, { width, height });
			context.save();
			context.translate(width, 0);
			context.scale(-1, 1);
		}

		context.drawImage(videoElement, 0, 0);
		context.restore();
		const base64 = canvas.toDataURL('image/png');

		dispatch('image', {
			base64: base64
		});
	}

	const swapCameras = () => {
		facingMode = facingMode === 'user' ? 'environment' : 'user';

		if (!cameraDevices) return;
		if (typeof mediaStreamConstraints.video !== 'object') return;

		cameraDeviceId = cameraDevices[facingMode].deviceId;

		console.log(cameraDeviceId);

		mediaStreamConstraints.video.facingMode = facingMode;
		mediaStreamConstraints.video.deviceId = cameraDeviceId;

		startCamera(false);
	};
</script>

<div class="h-full w-full relative flex justify-center items-center">
	{#if isLoading}
		<div class="z-50">
			<SyncLoader color="black" size={60} />
		</div>
	{/if}
	<video
		autoplay
		{id}
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
</div>

<style>
</style>
