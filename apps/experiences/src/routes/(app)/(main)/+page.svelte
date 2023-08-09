<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import { goto } from '$app/navigation';
	import { mapOrTakePhoto } from '../+layout.svelte';
	import { myNewExperienceStore } from '../createNewExperience/newExperienceStore';
	import MarkerImage from '$lib/components/Map/MarkerImage.svelte';
	import type { Base64, Location } from '@app/ts-types';
	import { countSameItemsInArray, roundNumber } from '@app/utils';
	import lodash from 'lodash';

	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';

	export let data;

	let location: Location;

	//remove old right now added experinece from store and load it into variable to screen it to user
	const rightNowAddedExperience = $myNewExperienceStore.rightNowAddedExperience;
	$myNewExperienceStore.rightNowAddedExperience = undefined;

	const tookPhoto = (e: CustomEvent<{ base64: string }>) => {
		$mapOrTakePhoto = 'map';
		$myNewExperienceStore = { imgSrc: e.detail.base64, location: location };
		goto(`/createNewExperience`);
	};

	let mapZoom: number;

	let almostProfile = false;
	let almostProfileImageSrc: string | Base64;

	const experiencesLocations = data.loadedExperiences.map((exp) =>
		exp.location.map((xy) => roundNumber(xy, 4))
	) as Location[];

	const sameLocation = countSameItemsInArray(experiencesLocations);

	const howManyBeforeMe = (myLocation: Location, myIndex: number) => {
		const res = experiencesLocations.filter(
			(location, index) =>
				lodash.isEqual(
					[roundNumber(myLocation[0], 4), roundNumber(myLocation[1], 4)],
					location
				) && myIndex > index
		).length;

		return res;
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if $mapOrTakePhoto === 'map'}
		<Map
			isLoading={!$myNewExperienceStore.rightNowAddedExperience}
			bind:zoom={mapZoom}
			bind:location
		>
			{#each data.loadedExperiences as experience, index}
				<MarkerImage
					class={rightNowAddedExperience?.$id === experience.$id ? 'animate-bounce' : ''}
					stacked={sameLocation[JSON.stringify(experiencesLocations[index])] > 1
						? true
						: false}
					on:almostProfile={(e) => {
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
		{#if almostProfile}
			<AlmostProfileWithMainImage
				on:close={() => (almostProfile = false)}
				class="absolute sm:left-0 sm:top-0 sm:m-4 z-[60]"
				userInfo={lodash.pick(data.user, 'myId', 'username', 'userId')}
				imgSrc={almostProfileImageSrc}
			/>
		{/if}
	{:else}
		<TakePhoto on:image={tookPhoto} />
	{/if}
</div>
