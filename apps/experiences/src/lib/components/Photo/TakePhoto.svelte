<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ShootButton from './ShootButton.svelte';
	import { browser } from '$app/environment';
	import Icon from '../Common/Icon.svelte';
	import Cropper from 'cropperjs';

	export let facingMode: 'user' | 'environment' = 'environment';

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		image: { base64: string };
	}>();

	let video_source: HTMLVideoElement | null;
	let canvas: HTMLCanvasElement | null;

	$: screenWidth = browser ? document.body.offsetWidth : 0;
	$: screenHeight = browser ? document.body.offsetHeight : 0;

	let mediaStreamConstraints: MediaStreamConstraints;

	$: mediaStreamConstraints = {
		video: {
			frameRate: { min: 1, max: 60, ideal: 60 },
			facingMode: facingMode,
			width: { min: 1, max: screenWidth, ideal: screenHeight },
			height: {
				min: 1,
				max: screenHeight,
				ideal: screenHeight
			}
		},
		audio: false
	};

	onMount(() => (canvas = document.createElement('canvas')));

	//set width and height for best quality of screen
	onMount(() => {
		navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then((stream) => {
			const track = stream.getVideoTracks()[0]; //track i am currently using
			const settings = track.getSettings();
			if (!mediaStreamConstraints.video || typeof mediaStreamConstraints.video === 'boolean')
				throw TypeError('constraints.video type is not supported');

			const width = settings.width;
			const height = settings.height;

			mediaStreamConstraints.video.height = { min: height, max: height, ideal: height };
			mediaStreamConstraints.video.width = { min: width, max: width, ideal: width };
			mediaStreamConstraints.video.aspectRatio = settings.aspectRatio;
		});
	});

	$: if (mediaStreamConstraints) start();

	const start = async () => {
		console.log('start');

		if (!video_source) throw new TypeError('video_source is null');
		video_source.pause();
		const stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
		video_source.play();
		console.log('play');

		video_source.srcObject = stream; //set video to video element
	};

	function takePicture() {
		if (!canvas) throw new TypeError('canvas is null');
		if (!video_source) throw new TypeError('video_source is not null');

		var context = canvas.getContext('2d')!;

		if (!mediaStreamConstraints.video || typeof mediaStreamConstraints.video === 'boolean')
			throw TypeError('constraints.video type is not supported');
		if (!mediaStreamConstraints.video.width || !mediaStreamConstraints.video.height) return;

		//@ts-ignore
		canvas.width = mediaStreamConstraints.video.width.ideal as number;
		//@ts-ignore
		canvas.height = mediaStreamConstraints.video.height.ideal as number;

		context.drawImage(video_source, 0, 0);

		const base64 = canvas.toDataURL('image/png');

		dispatch('image', {
			base64: base64
		});
	}

	const swapCameras = () => (facingMode = facingMode === 'user' ? 'environment' : 'user');
</script>

<div class="h-full w-full relative">
	<video
		autoplay
		bind:this={video_source}
		class={twMerge(
			'h-full object-cover  absolute',
			facingMode === 'user' ? 'scale-x-[-1]' : '',
			className
		)}
	>
		<track kind="captions" />
	</video>
	<div class="absolute bottom-0 mb-24 flex justify-center items-center w-full">
		<ShootButton class="active:animate-ping" on:click={takePicture} />
		<Icon
			on:click={swapCameras}
			icon="fas fa-sync-alt"
			class="text-4xl absolute right-0 m-14 active:animate-ping"
		/>
	</div>
</div>

<style>
</style>
