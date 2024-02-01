<script lang="ts">
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
</script>

<TakePhoto />

<style>
	:global(.camera-header) {
		display: none !important;
	}
	video {
		height: 100vh !important;
	}
</style>
