<script lang="ts">
	import Uppy from '@uppy/core';
	import Webcam from '@uppy/webcam';
	import Dashboard from '@uppy//dashboard';
	import ImageEditor from '@uppy/image-editor';
	import '@uppy/core/dist/style.min.css';
	import '@uppy/dashboard/dist/style.min.css';
	import '@uppy/webcam/dist/style.min.css';
	import '@uppy/image-editor/dist/style.min.css';

	let constrains: MediaTrackConstraints;

	const load = (divEl: HTMLElement) => {
		const screenWith = document.body.offsetWidth;
		const screenHeight = document.body.offsetHeight;
		const constrains = {
			width: { min: 1, max: screenWith, ideal: screenWith },
			height: { min: 1, max: screenHeight, ideal: screenHeight }
		};

		const uppy = new Uppy();
		uppy.use(Dashboard, { inline: true, target: divEl })
			.use(Webcam, {
				mirror: true,
				facingMode: 'environment',
				showRecordingLength: true,
				target: Dashboard,
				modes: ['picture'],
				videoConstraints: constrains
			})
			.use(ImageEditor, { target: Dashboard });
	};
</script>

<div class="w-full h-full" use:load />

<style>
	:global(.uppy-Dashboard-inner) {
		height: 100dvh !important;
	}
	:global(.uppy-Webcam-container) {
		height: 100dvh !important;
		position: absolute !important;
		top: 0 !important;
		z-index: 999999 !important;
	}
</style>
