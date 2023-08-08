<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import { goto } from '$app/navigation';
	import { mapOrTakePhoto } from '../+layout.svelte';
	import { myNewExperienceStore } from '../createNewExperience/newExperienceStore';
	import MarkerImage from '$lib/components/Map/MarkerImage.svelte';
	import type { Base64, Location } from '@app/ts-types';
	import type { CarouselImage } from '$lib/components/Carousel/types';
	import { countSameItemsInArray, roundNumber } from '@app/utils';
	import { isEqual, pick } from 'lodash';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import { Img } from 'flowbite-svelte';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';

	export let data;

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

	let almostProfile = true;
	let almostProfileImageSrc: string | Base64 =
		'https://cloud.appwrite.io/v1/storage/buckets/experiences-pictures/files/64d0bc360456fd8daebf/view?project=experiences';

	const experiencesLocations = data.loadedExperiences.map((exp) =>
		exp.location.map((xy) => roundNumber(xy, 4))
	) as Location[];

	const sameLocation = countSameItemsInArray(experiencesLocations);

	const howManyBeforeMe = (myLocation: Location, myIndex: number) => {
		const res = experiencesLocations.filter(
			(location, index) =>
				isEqual([roundNumber(myLocation[0], 4), roundNumber(myLocation[1], 4)], location) &&
				myIndex > index
		).length;

		return res;
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if $mapOrTakePhoto === 'map'}
		<Map bind:zoom={mapZoom} bind:location={$myNewExperienceStore.location}>
			{#each data.loadedExperiences as experience, index}
				<MarkerImage
					stacked={sameLocation[JSON.stringify(experiencesLocations[index])] > 1
						? true
						: false}
					on:fullScreen={(e) => {
						almostProfile = true;
						almostProfileImageSrc = e.detail.imgSrc;
					}}
					zoom={mapZoom}
					imgSrc={experience.imgSrc}
					location={[
						experience.location[0],
						experience.location[1] +
							howManyBeforeMe(experience.location, index) * 0.00008
					]}
				/>
			{/each}
		</Map>
	{:else}
		<TakePhoto on:image={tookPhoto} />
	{/if}

	{#if almostProfile}
		<AlmostProfileWithMainImage
			on:close={() => (almostProfile = false)}
			class="absolute sm:left-0 sm:top-0 sm:m-4 z-[60]"
			userInfo={pick(data.user, 'myId', 'username', 'userId')}
			imgSrc={almostProfileImageSrc}
		/>
	{/if}
</div>
