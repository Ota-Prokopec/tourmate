<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import Gallery from '$lib/components/Common/Gallery.svelte';
	import ExperienceCard from '$lib/components/Experience-monument/Cards/ExperienceCard.svelte';
	import MonumentCard from '$lib/components/Experience-monument/Cards/MonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Base64 } from '@app/ts-types';
	import ProfilePictureEditor from '$lib/components/Common/ProfilePictureEditor.svelte';
	import { Skeleton } from 'flowbite-svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { goto } from '$app/navigation';

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

	let screenProfilePicEditor = false;
	let newProfilePicture: string | Base64 = '';
	let uploadingProfilePictureIsLoading = false;

	const openProfilePicEditor = (base64: Base64) => {
		screenProfilePicEditor = true;
		newProfilePicture = base64;
	};
	const updateProfilePicture = async (base64: Base64) => {
		uploadingProfilePictureIsLoading = true;
		const {
			updateProfilePicture: { profilePictureURL }
		} = await sdk.updateProfilePicture({ picture: base64 });
		data.userProfile.profilePictureURL = profilePictureURL;
		uploadingProfilePictureIsLoading = false;
		screenProfilePicEditor = false;
	};
</script>

{#if screenProfilePicEditor}
	<ProfilePictureEditor
		isLoading={uploadingProfilePictureIsLoading}
		on:save={(e) => updateProfilePicture(e.detail.base64)}
		profilePicture={newProfilePicture}
	/>
{:else}
	<div class="w-full h-auto flex flex-wrap flex-col">
		<div class="w-full h-auto flex flex-wrap flex-row gap-2 items-start">
			{#if isMyAccount}
				<AvatarImageInput
					screenErrors
					class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
					imageURL={data.userProfile.profilePictureURL}
					on:image={async ({ detail: { base64 } }) => {
						openProfilePicEditor(base64);
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
		<span class="text-3xl p-4">{data.userProfile.username}</span>

		<div class="w-full h-auto flex justify-center mb-2 flex-wrap flex-col gap-4">
			<CategoryPicker {categories} bind:chosenCategory={experiencesType} />
			<Gallery class="">
				{#if experiencesType === 'experiences'}
					{#each usersExperiences as experience}
						<ExperienceCard {experience} />
					{/each}
				{:else if usersMonuments.length}
					{#each usersMonuments as monument}
						<MonumentCard {monument} />
					{/each}
				{:else}
					<Skeleton divClass="w-full" />
					<Button on:click={() => goto(`/addMonument`)} class="bg-white border border-gray-400">
						<Text class="!text-black">Create your first monument</Text>
						<Icon class="fill-red-500 w-7 h-7">
							<IconLocation />
						</Icon>
					</Button>
				{/if}
			</Gallery>
		</div>
	</div>
{/if}
