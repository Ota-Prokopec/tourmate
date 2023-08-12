<script lang="ts">
	import { Avatar, Button, ButtonGroup, Card, Img } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import ImageInput from '$lib/components/Common/ImageInput.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { Gallery } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MarkerImage from '$lib/components/Map/MarkerImage.svelte';
	import type { Location } from '@app/ts-types';
	import { countSameItemsInArray, roundNumber } from '@app/utils';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';

	export let data: PageData;

	const images = data.usersExperiences.map((exp) => ({
		src: exp.imgSrc
	}));

	let experiencesType: 'map' | 'gallery' = 'map';

	let isMyAccount = data.user?.$id === data.userProfile.userId;

	const experiencesLocations = data.usersExperiences.map((exp) =>
		exp.location.map((xy) => roundNumber(xy, 4))
	) as Location[];

	const sameLocation = countSameItemsInArray(experiencesLocations);

	const categories = [
		{ title: 'map', key: 'map' },
		{ title: 'gallery', key: 'gallery' }
	] as const;
</script>

<div class="w-full h-auto flex flex-wrap flex-col">
	<div class="w-full h-auto flex flex-wrap flex-row gap-2 items-start p-4">
		{#if isMyAccount}
			<ImageInput
				screenErrors
				style="avatar"
				class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
				imageSrc={data.userProfile.profilePictureURL}
				on:image={async ({ detail }) => {}}
			/>
		{:else}
			<Avatar
				size="xl"
				class="h-40 w-40 overflow-hidden"
				src={data.userProfile.profilePictureURL}
			/>
		{/if}
		<div class="flex justify-start p-3 gap-4 mt-2 items-center text-2xl">
			<div>{`${data.userProfile.myId}`}</div>
			{#if isMyAccount}
				<Icon icon="fa fa-gear" />
			{/if}
		</div>
	</div>
	<span class=" text-3xl p-4">{data.userProfile.username}</span>

	<div class="w-full h-auto flex justify-center mb-2">
		<CategoryPicker
			{categories}
			on:change={(e) => {
				experiencesType = e.detail;
			}}
		/>
	</div>

	{#if experiencesType === 'gallery'}
		<Card class="w-full">
			<Gallery
				items={images}
				imgClass="w-40 h-40 rounded-xl"
				class="gap-2 flex flex-wrap flex-row"
			/>
		</Card>
	{:else}
		<Map class="z-[999] h-[600px] w-full max-w-[1000px] sm:m-4">
			{#each data.usersExperiences as experience, index}
				<MarkerImage
					imgSrc={experience.imgSrc}
					location={[experience.location[0], experience.location[1]]}
				/>
			{/each}
		</Map>
	{/if}
</div>
