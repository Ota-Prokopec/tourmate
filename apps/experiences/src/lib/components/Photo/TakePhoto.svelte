<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ShootButton from './ShootButton.svelte';
	import { browser } from '$app/environment';

	let video_source: HTMLVideoElement;
	let canvas: HTMLCanvasElement;

	$: screenWidth = browser ? document.body.offsetWidth : 0;
	$: screenHeight = browser ? document.body.offsetHeight : 0;

	let constraints: MediaStreamConstraints;
	let a: MediaTrackConstraints;

	$: constraints = {
		video: {
			width: { ideal: 2160 },
			height: { ideal: 4096 },
			facingMode: 'environment'
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
			canvas.width = video_source.videoWidth;
			canvas.height = video_source.videoHeight;
			context.drawImage(
				video_source,
				0,
				0,
				video_source.videoWidth,
				video_source.videoHeight
			);

			var base64 = canvas.toDataURL('image/png');

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
		class={twMerge('w-full h-full object-fill absolute', className)}
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
