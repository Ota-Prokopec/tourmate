<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Base64, ExperienceCard, MonumentCard } from '@app/ts-types';
	import ProfilePictureEditor from '$lib/components/Common/ProfilePictureEditor.svelte';
	import { Skeleton } from 'flowbite-svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { goto } from '$app/navigation';
	import Column from '$lib/components/Common/Column.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import LL from '$src/i18n/i18n-svelte';

	export let data: PageData;

	let usersMonuments: MonumentCard[] | undefined = undefined;
	const usersExperiences: ExperienceCard[] = data.userProfile.experiences;

	let category: 'monuments' | 'experiences' = 'experiences';

	let isMyAccount = data.user?.userId === data.userProfile.userId;
	let isLoading = false;

	const categories = [
		{ title: $LL.pictures(), key: 'experiences' },
		{ title: $LL.monuments(), key: 'monuments' }
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

	$: if (category === 'monuments' && !usersMonuments) {
		isLoading = true;
		sdk
			.getListOfMonumentCards({ userId: data.userProfile.userId })
			.then(({ getListOfMonuments: monuments }) => {
				usersMonuments = monuments;
				isLoading = false;
			});
	}
</script>

{#if screenProfilePicEditor}
	<ProfilePictureEditor
		isLoading={uploadingProfilePictureIsLoading}
		on:save={(e) => updateProfilePicture(e.detail.base64)}
		profilePicture={newProfilePicture}
	/>
{:else}
	<div class="w-full h-auto flex flex-wrap flex-col p-2">
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
				<Text>{`${data.userProfile.myId}`}</Text>
				{#if isMyAccount}
					<Icon on:click={() => goto(`${data.userProfile.myId}/edit`)} icon="fa fa-gear" />
				{/if}
			</div>
		</div>
		<span class="text-3xl p-4">{data.userProfile.username}</span>

		<div class="w-full h-auto flex justify-center mb-2 flex-wrap flex-col gap-4">
			<CategoryPicker {categories} bind:chosenCategory={category} />
			{#if isLoading}
				<Center class="h-full"><Loading /></Center>
			{:else}
				<Column class="gap-10 justify-center items-center w-full">
					{#if category === 'experiences'}
						{#if usersExperiences.length}
							{#each usersExperiences as experience}
								<ExperienceCardComponent {experience} />
							{/each}
						{:else}
							<Skeleton divClass="w-full" />
							<Button on:click={() => goto(`/`)} class="bg-white border border-gray-400 ">
								<Text class="!text-black">{$LL.takeYourFirstPicture()}</Text>
								<Icon class="fill-red-500 w-7 h-7">
									<IconLocation />
								</Icon>
							</Button>
						{/if}
					{:else if usersMonuments?.length}
						{#each usersMonuments as monument}
							<MonumentCardComponent size="normal" {monument} />
						{/each}
					{:else}
						<Skeleton divClass="w-full" />
						<Button on:click={() => goto(`/addMonument`)} class="bg-white border border-gray-400 ">
							<Text class="!text-black">{$LL.createYourFirstMonument()}</Text>
							<Icon class="fill-red-500 w-7 h-7">
								<IconLocation />
							</Icon>
						</Button>
					{/if}
				</Column>
			{/if}
		</div>
	</div>
{/if}
