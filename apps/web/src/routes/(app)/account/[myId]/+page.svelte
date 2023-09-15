<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MarkerImage from '$lib/components/Map/MarkerImage.svelte';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { buckets, collections, user } from '@app/appwrite-client';
	import { permissions } from '@app/appwrite-server';

	export let data: PageData;

	const images = data.userProfile.experiences.map((exp) => ({
		src: exp.imgSrc
	}));

	let experiencesType: 'map' | 'gallery' = 'map';

	let isMyAccount = data.user?.userId === data.userProfile.userId;

	const categories = [
		{ title: 'map', key: 'map' },
		{ title: 'gallery', key: 'gallery' }
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
			collections.userInfo.updateDocument(data.userProfile._id, { profilePictureURL: newPicture });
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

	<div class="w-full h-auto flex justify-center mb-2">
		<CategoryPicker
			{categories}
			on:change={(e) => {
				experiencesType = e.detail;
			}}
		/>
	</div>

	{#if experiencesType === 'gallery'}
		<Card class="w-full" />
	{:else}
		<Map class="z-[999] h-[600px] w-full max-w-[1000px] ">
			{#each data.userProfile.experiences as experience}
				<MarkerImage
					imgSrc={experience.imgSrc}
					location={[experience.location[0], experience.location[1]]}
				/>
			{/each}
		</Map>
	{/if}
</div>
