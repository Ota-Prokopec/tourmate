<script lang="ts">
	import { myNewExperienceStore } from './newExperienceStore';
	import * as marker from 'markerjs2';

	import { onMount } from 'svelte';
	import { sdk } from '$src/graphql/sdk';
	import lsStore from '$lib/utils/lsStore';
	import { goto } from '$app/navigation';

	onMount(() => {
		const editorContainer = document.getElementById('imgEditor') as HTMLImageElement | null;
		if (!editorContainer) throw new Error('container is not defined');
		let markerArea = new marker.MarkerArea(editorContainer);
		markerArea.addEventListener('render', (event) => {
			if (!location) throw new Error('location is not defined');

			sdk.createExperience({
				input: {
					location: location,
					picture: event.dataUrl
				}
			});
			goto('/');
		});
		markerArea.show();
	});

	const { imgSrc } = $myNewExperienceStore;
	const location = $lsStore.usersLocation;
</script>

<div class="w-full h-full flex justify-center items-center">
	<img src={imgSrc} alt="" id="imgEditor" class="h-full w-full flex justify-center items-center" />
</div>

<style>
</style>
