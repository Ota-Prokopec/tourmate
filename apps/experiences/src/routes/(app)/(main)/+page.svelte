<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import { goto } from '$app/navigation';
	import { mapOrTakePhoto } from '../+layout.svelte';
	import { myNewExperienceStore } from '../createNewExperience/newExperienceStore';
	import MarkerImage from '$lib/components/Map/MarkerImage.svelte';
	import type { Base64 } from '@app/ts-types';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import type { CarouselImage } from '$lib/components/Carousel/types';
	import { browser } from '$app/environment';

	export let data;

	$: console.log(data.loadedExperiences.length);

	const images: CarouselImage[] = data.loadedExperiences.map((exp) => ({
		imgurl: exp.imgSrc,
		id: exp.$id
	}));

	const tookPhoto = (e: CustomEvent<{ base64: string }>) => {
		$mapOrTakePhoto = 'map';
		$myNewExperienceStore.imgSrc = e.detail.base64;
		goto(`/createNewExperience`);
	};

	let mapZoom: number;

	let fullScreen = false;
	let fullScreenImageSrc: string | Base64;
</script>

{#if $mapOrTakePhoto === 'map'}
	<Map bind:zoom={mapZoom} bind:location={$myNewExperienceStore.location}>
		{#each data.loadedExperiences as experience}
			<MarkerImage
				on:fullScreen={(e) => {
					fullScreen = true;
					fullScreenImageSrc = e.detail.imgSrc;
				}}
				zoom={mapZoom}
				imgSrc={experience.imgSrc}
				location={experience.location}
			/>
		{/each}
	</Map>
{:else}
	<TakePhoto on:image={tookPhoto} />
{/if}
