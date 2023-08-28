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
	export let facingMode: 'user' | 'environment' = 'environment';

	$: if (!isLoading && mediaStreamConstraints) startCamera();

	const startCamera = async () => {
		const stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
		if (videoElement) videoElement.srcObject = stream; //set video to video element
	};

	$: mediaStreamConstraints = {
		video: {
			deviceId: cameraDeviceId,
			frameRate: { min: 1, max: 120, ideal: 120 },
			facingMode: facingMode,
			width: { min: 1, max: 4900, ideal: 4900 },
			height: { min: 1, max: 4900, ideal: 4900 }
		},
		audio: false
	} as MediaStreamConstraints;

	let cameraDevices: MediaDeviceInfo[] | undefined;
	let cameraDeviceId: string | undefined;

	// get camera devices
	onMount(async () => {
		cameraDevices = await navigator.mediaDevices.enumerateDevices();
		cameraDevices = cameraDevices.filter((device) => device.kind === 'videoinput');
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

		context.drawImage(videoElement, 0, 0);

		const base64 = canvas.toDataURL('image/png');

		dispatch('image', {
			base64: base64
		});
	}

	const swapCameras = () => {
		facingMode = facingMode === 'user' ? 'environment' : 'user';
		if (!cameraDevices) return;
		cameraDeviceId =
			facingMode === 'user' ? cameraDevices[0].deviceId : cameraDevices[1].deviceId;
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
		{#if cameraDevices && cameraDevices?.length > 1}
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
