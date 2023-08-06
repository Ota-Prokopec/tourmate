<script lang="ts">
	import { device, elementIdGenerator } from '@app/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ShootButton from './ShootButton.svelte';
	import { blobToBase64 } from '@app/utils/src/utils/operations';
	import type { Base64 } from '@app/ts-types';
	const dispatch = createEventDispatcher<{
		image: { base64: string };
	}>();

	export let base64Image: Base64 | undefined = undefined;

	const id = elementIdGenerator('video-');
	let imageCapture: ImageCapture;
	const getVideoElement = () => document.getElementById(id) as HTMLVideoElement;

	onMount(async () => {
		const videoElement = getVideoElement();
		if (!videoElement) throw new TypeError('document not found');

		let videoDevices: MediaDeviceInfo[] = [];

		await navigator.mediaDevices.enumerateDevices().then((devices) => {
			videoDevices = devices.filter((device) => device.kind === 'videoinput');
		});

		const width = document.body.offsetWidth;
		const height = document.body.offsetHeight;

		const constraints: MediaTrackConstraints = {
			width: width,
			height: height,
			deviceId: videoDevices[0].deviceId
		};

		navigator.mediaDevices
			.getUserMedia({
				video: constraints,
				audio: false
			})
			.then(gotMedia);
	});

	const gotMedia = (stream: MediaStream) => {
		const videoElement = getVideoElement();
		if (!videoElement) throw new TypeError('document not found');
		videoElement.srcObject = stream;
		let mediaStreamTrack = stream.getVideoTracks()[0];
		imageCapture = new ImageCapture(mediaStreamTrack);
	};

	const takePhoto = async () => {
		const blob = await imageCapture.takePhoto();
		const base64 = await blobToBase64(blob);
		base64Image = base64;
		dispatch('image', { base64: base64Image });
	};

	const rotatingClass = '';
	let className = '';
	export { className as class };
</script>

<video
	{id}
	autoplay
	class={twMerge('w-full h-full object-fill absolute', rotatingClass, className)}
	src=""
>
	<track kind="captions" />
</video>
<div class="absolute bottom-0 mb-24 flex justify-center items-center w-full">
	<ShootButton on:click={takePhoto} />
</div>

<style>
	.rotate {
		transform: rotateY(180deg);
	}
</style>
