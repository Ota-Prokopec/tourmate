<script lang="ts">
	import QRcode, { QRCodeOptions } from 'qrcode';
	import Img from './Img.svelte';

	export let data: string;
	export let isLoading = true;

	export let config: QRCodeOptions = {
		errorCorrectionLevel: 'low'
	};

	QRcode.toDataURL(data, config).then((url) => (imgSrc = url));

	let imgSrc: string = '';

	$: isLoading = imgSrc ? false : true;

	let className = '';
	export { className as class };
</script>

{#if !isLoading}
	<Img class={className} src={imgSrc} />
{/if}
