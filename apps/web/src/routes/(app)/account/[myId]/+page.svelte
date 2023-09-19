<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { buckets, collections, user } from '@app/appwrite-client';
	import * as permissions from '@app/appwrite-permissions';
	import Gallery from '$lib/components/Common/Gallery.svelte';
	import ExperienceCard from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import MonumentCard from '$lib/components/Experience/Cards/MonumentCard.svelte';

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

	const updateProfilePicture = async (file: File) => {
		try {
			const currentPicture =
				data.userProfile.profilePictureURL &&
				(await buckets.profilePictures.getFile(
					buckets.profilePictures.getParamsFromURL(data.userProfile.profilePictureURL).fileId
				));
			if (currentPicture && currentPicture.$id) {
				// delete old picture
				await buckets.profilePictures.deleteFile(currentPicture.$id);
			}
			const newPicture = await buckets.profilePictures.createFile(
				file,
				permissions.owner(data.user.userId)
			);
			await collections.userInfo.updateDocument(data.userProfile._id, {
				profilePictureURL: buckets.profilePictures.getFileURL(newPicture.$id)
			});
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="w-full h-auto flex flex-wrap flex-col">
	<div class="w-full h-auto flex flex-wrap flex-row gap-2 items-start p-4">
		{#if isMyAccount}
			<AvatarImageInput
				screenErrors
				class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
				imageURL={data.userProfile.profilePictureURL}
				on:image={async ({ detail: { file } }) => {
					updateProfilePicture(file);
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
		<CategoryPicker
			{categories}
			on:change={(e) => {
				experiencesType = e.detail;
			}}
		/>
		<Gallery class="">
			{#if experiencesType === 'experiences'}
				{#each usersExperiences as experience}
					<ExperienceCard {experience} />
				{/each}
			{:else}
				{#each usersMonuments as monument}
					<MonumentCard class="w-full" {monument} />
				{/each}
			{/if}
		</Gallery>
	</div>
</div>
