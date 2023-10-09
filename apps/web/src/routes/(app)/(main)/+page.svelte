<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import { goto } from '$app/navigation';
	import { mapOrTakePhoto } from '../+layout.svelte';
	import { myNewExperienceStore } from '../createNewExperience/newExperienceStore';
	import type { Base64, Location } from '@app/ts-types';
	import { countSameItemsInArray, getUsersLocation, roundNumber } from '@app/utils';
	import lodash from 'lodash';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';
	import type { PageData } from './$types';
	import ExperienceMarker from '$lib/components/Map/Markers/ExperienceMarker.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	import { sdk } from '$src/graphql/sdk';

	export let data: PageData;
	let location: Location;

	const experiencesMonuments = useQuery('experiences', async () => {
		const location = await getUsersLocation({ enableHighAccuracy: false });
		return await sdk.getListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments(
			{
				input: {
					location,
					zoom: 14
				}
			}
		);
	});

	$: experiences = $experiencesMonuments.isLoading
		? null
		: $experiencesMonuments.data?.getListOfExperiences;
	$: monuments = $experiencesMonuments.isLoading
		? null
		: $experiencesMonuments.data?.getListOfMonuments;

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

	$: experiencesLocations = experiences?.map((exp) =>
		exp.location.map((xy) => roundNumber(xy, 4))
	) as Location[];
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if $mapOrTakePhoto === 'map'}
		<Map deg={45} bind:zoom={mapZoom} bind:location>
			{#if experiences}
				{#each experiences as experience, index}
					<ExperienceMarker
						zoom={mapZoom}
						bouncing={rightNowAddedExperience?.$id === experience._id}
						on:almostProfile={(e) => {
							almostProfile = true;
							almostProfileImageSrc = e.detail.imgSrc;
						}}
						{experience}
					/>
				{/each}
			{/if}

			{#if monuments}
				{#each monuments as monument, index}
					<MonumentMarker {monument} />
				{/each}
			{/if}
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
