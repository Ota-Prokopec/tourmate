<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ShootButton from './ShootButton.svelte';
	import { browser } from '$app/environment';

	let video_source: HTMLVideoElement;
	let canvas: HTMLCanvasElement;

	const desiredAspectRatio = 16 / 9;

	$: screenWidth = browser ? window.screen.width : 0;
	$: screenHeight = browser ? window.screen.height : 0;

	$: videoWidth = screenWidth;
	$: videoHeight = screenWidth / desiredAspectRatio;

	// Adjust video dimensions if height exceeds the screen height
	if (videoHeight > screenHeight) {
		videoHeight = screenHeight;
		videoWidth = screenHeight * desiredAspectRatio;
	}

	let constraints: MediaStreamConstraints;
	let a: MediaTrackConstraints;

	$: constraints = {
		video: {
			frameRate: { min: 30, ideal: 60 },
			width: { ideal: 4096 }, // Max 4K width
			height: { ideal: 2304 }, // Max 4K height with 16:9 aspect ratio
			facingMode: 'environment' // or 'user' for front-facing camera
		},

		audio: false
	};

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		image: { base64: string };
	}>();

	onMount(() => (canvas = document.createElement('canvas')));

	async function access_webcam() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			video_source.srcObject = stream;
			video_source.play();
		} catch (error) {
			console.error(error);
		}
	}

	function takePicture() {
		var context = canvas.getContext('2d')!;

		if (video_source.videoWidth && video_source.videoHeight) {
			const offsetWidth = (video_source.offsetWidth - screenWidth) / 2;
			canvas.width = video_source.offsetWidth;
			canvas.height = video_source.offsetHeight;

			context.drawImage(video_source, offsetWidth, 0, screenWidth, screenHeight);
			const base64 = canvas.toDataURL('image/png');

			dispatch('image', {
				base64: base64
			});
		}
	}

	onMount(access_webcam);
</script>

<div class="h-full w-full relative">
	<video
		autoplay
		bind:this={video_source}
		class={twMerge('w-full h-full object-cover  absolute', className)}
	>
		<track kind="captions" />
	</video>
	<div class="absolute bottom-0 mb-24 flex justify-center items-center w-full">
		<ShootButton on:click={takePicture} />
	</div>
</div>

<style>
	video {
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);
	}
</style>
