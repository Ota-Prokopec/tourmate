<script lang="ts" defer>
	import { myNewExperienceStore } from './newExperienceStore';
	import * as marker from 'markerjs2';

	import { onMount } from 'svelte';
	import { sdk } from '$src/graphql/sdk';
	import lsStore from '$lib/utils/lsStore';
	import { goto } from '$app/navigation';
	import { useQuery } from '@apollo/client';
	import { getDetailsByLatAndLong } from '@app/utils';
	import Title from '$lib/components/Common/Title.svelte';
	import ImageEditor from '$lib/components/Common/ImageEditor.svelte';

	// onMount(() => {
	// 	const editorContainer = document.getElementById('imgEditor') as HTMLImageElement | null;
	// 	if (!editorContainer) throw new Error('container is not defined');
	// 	let markerArea = new marker.MarkerArea(editorContainer);
	// 	markerArea.addEventListener('render', (event) => {
	// 		if (!location) throw new Error('location is not defined');

	// 		sdk.createExperience({
	// 			input: {
	// 				location: location,
	// 				picture: event.dataUrl
	// 			}
	// 		});
	// 		goto('/');
	// 	});
	// 	markerArea.show();
	// });

	// <div class="w-full h-full flex justify-center items-center">
	// 	<Title class="absolute z-40 bottom-0 mb-4">
	// 		{#if placeDetailsPromise}
	// 			{#await placeDetailsPromise then placeDetails}
	// 				place: {placeDetails.name}
	// 			{/await}
	// 		{/if}
	// 	</Title>
	// 	<img src={imgSrc} alt="" id="imgEditor" class="h-full w-full flex justify-center items-center" />
	// </div>

	const { imgSrc } = $myNewExperienceStore;
	const location = $lsStore.usersLocation;

	$: placeDetailsPromise = location ? getDetailsByLatAndLong(location[0], location[1]) : null;
</script>

<ImageEditor
	img="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
/>

<style>
</style>
