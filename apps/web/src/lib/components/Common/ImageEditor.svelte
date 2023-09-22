<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import { onMount } from 'svelte';

	export let img: Base64 | string = '';

	let isPainting = false;
	let lineWidth = 5;
	let ctx: null | CanvasRenderingContext2D;
	let canvasOffsetX = 0;
	let canvasOffsetY = 0;
	let startX = 0;
	let startY = 0;

	const getImageSource = (
		img: string | Base64,
		onLoad: (imageElement: HTMLImageElement) => void
	) => {
		const image = new Image();
		image.src = img;
		image.onload = () => onLoad(image);
	};

	onMount(() => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const imageElement = document.getElementById('image') as HTMLImageElement;

		imageElement.onload = () => {
			console.log('load');

			const difference =
				imageElement.offsetHeight - document.body.offsetHeight > 0
					? imageElement.offsetHeight - document.body.offsetHeight
					: 0;

			if (!ctx) throw new Error('ctx');

			const offsetX = document.body.offsetWidth - imageElement.offsetWidth;

			ctx.drawImage(imageElement, 0, 0, imageElement.offsetWidth, imageElement.offsetHeight);
			ctx?.restore();
			console.log(imageElement.offsetHeight);

			canvas.height = window.screen.height;
			canvas.width = window.screen.width;

			const url = canvas.toDataURL();
			location.href = url;
		};
	});

	const draw = (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLCanvasElement;
		}
	) => {
		if (!isPainting) return; //is not painting
		if (!ctx) throw new Error('canvas is not defined');

		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';

		ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
		ctx.stroke();
	};

	const mousedown = (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLCanvasElement;
		}
	) => {
		isPainting = true;
		startX = e.clientX;
		startY = e.clientY;
	};

	const mouseup = () => {
		isPainting = false;
		ctx?.stroke();
		ctx?.beginPath();
	};

	const move = draw;
</script>

<div class="w-full h-full flex">
	<img class="h-full w-full" id="image" alt="" />
	<canvas
		class="z-50 absolute top-0"
		on:mousemove={move}
		on:mousedown={mousedown}
		on:mouseup={mouseup}
		id="canvas"
	/>
</div>
