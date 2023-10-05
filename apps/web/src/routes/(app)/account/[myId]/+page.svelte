<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import Gallery from '$lib/components/Common/Gallery.svelte';
	import ExperienceCard from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import MonumentCard from '$lib/components/Experience/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Base64 } from '@app/ts-types';
	import imageSvelte from '@app/image-svelte';
	import Cropper from 'cropperjs';

	export let data: PageData;

	const images = data.userProfile.experiences.map((exp) => ({
		src: exp.imgSrc
	}));

	const usersMonuments = data.userProfile.monuments;
	const usersExperiences = data.userProfile.experiences;

	let experiencesType: 'monuments' | 'experiences' = 'monuments';

	let isMyAccount = data.user?.userId === data.userProfile.userId;

	const categories = [
		{ title: 'fotky', key: 'experiences' },
		{ title: 'památky', key: 'monuments' }
	] as const;

	const [picture, actions] = imageSvelte({ howManyImagesBeforeUndoAvailable: 1 });

	const changeProfilePic = async (base64: Base64) => {
		const cropper = new Cropper();
		cropper.sdk.updateProfilePicture({ picture: $picture });
	};
</script>

<div class="w-full h-auto flex flex-wrap flex-col">
	<div class="w-full h-auto flex flex-wrap flex-row gap-2 items-start p-4">
		{#if isMyAccount}
			<AvatarImageInput
				screenErrors
				class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
				imageURL={data.userProfile.profilePictureURL}
				on:image={async ({ detail: { base64 } }) => {
					changeProfilePic(base64);
				}}
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

	<div class="w-full h-auto flex justify-center mb-2 flex-wrap flex-col gap-4">
		<CategoryPicker {categories} bind:chosenCategory={experiencesType} />
		<Gallery class="">
			{#if experiencesType === 'experiences'}
				{#each usersExperiences as experience}
					<ExperienceCard {experience} />
				{/each}
			{:else}{/if}
		</Gallery>
	</div>
</div>
