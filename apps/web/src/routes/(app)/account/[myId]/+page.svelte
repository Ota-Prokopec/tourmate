<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import ProfilePictureEditor from '$lib/components/Common/ProfilePictureEditor.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import SkeletonLine from '$lib/components/Common/SkeletonLine.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import ExperienceCardSkeleton from '$lib/components/Experience-monument/Cards/experience/ExperienceCardSkeleton.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import type { Base64, ExperienceCard, MonumentCard } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Skeleton } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import CreateYourFirstMonumentButton from './Components/CreateYourFirstMonumentButton.svelte';
	import CreateYourFirstPicture from './Components/CreateYourFirstPicture.svelte';
	import EditProfileButton from './Components/EditProfileButton.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';

	export let data: PageData;

	$: usersProfileQuery = useQuery('usersProfile', async () => {
		return await sdk.getProfile({ myId: data.props.myId });
	});
	$: userProfile = $usersProfileQuery.data?.getUser;

	let usersMonuments: MonumentCard[] | undefined = undefined;
	let usersExperiences: ExperienceCard[] = [];
	$: usersExperiences = userProfile?.experiences || [];

	let category: 'monuments' | 'experiences' = 'experiences';

	$: isMyAccount = data.user.userId === userProfile?.userId;

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
		if (!userProfile) throw new Error('userProfile is not defined');
		userProfile.profilePictureURL = profilePictureURL;
		uploadingProfilePictureIsLoading = false;
		screenProfilePicEditor = false;
	};

	$: if (category === 'monuments' && !usersMonuments) {
		if (!userProfile) throw new Error('userProfile is not defined');
		sdk
			.getListOfMonumentCards({ userId: userProfile.userId })
			.then(({ getListOfMonuments: monuments }) => {
				usersMonuments = monuments;
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
	<Column class="p-2">
		<div class="w-full h-auto flex flex-wrap flex-row gap-2 items-start">
			{#if isMyAccount}
				<AvatarImageInput
					screenErrors
					class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
					imageURL={userProfile?.profilePictureURL}
					on:image={async ({ detail: { base64 } }) => {
						openProfilePicEditor(base64);
					}}
				/>
			{:else}
				<Avatar size="xl" class="h-40 w-40 overflow-hidden" src={userProfile?.profilePictureURL} />
			{/if}
			<Row class="justify-start p-3 gap-4 mt-2 text-2xl">
				{#if userProfile}
					<Text>{userProfile.myId}</Text>
				{:else}
					<SkeletonLine class="w-[180px] h-4" />
				{/if}
				{#if isMyAccount}
					<Icon on:click={() => goto(`${userProfile?.myId}/settings`)} icon="fa fa-gear" />
				{/if}
			</Row>
		</div>
		{#if userProfile}
			<Text class="text-3xl p-4">{userProfile?.username}</Text>
		{:else}
			<SkeletonLine class="w-[240px] h-4" />
		{/if}

		{#if isMyAccount && userProfile}
			<EditProfileButton myId={userProfile?.myId} />
		{/if}

		<Column class="mb-2 gap-4">
			<CategoryPicker {categories} bind:chosenCategory={category} />

			<Column class="gap-10 justify-center items-center">
				{#if category === 'experiences'}
					{#if userProfile}
						{#if usersExperiences.length}
							{#each usersExperiences as experience}
								<ExperienceCardComponent {experience} />
							{/each}
						{:else}
							<Skeleton divClass="w-full" />
							{#if isMyAccount}
								<CreateYourFirstPicture />
							{/if}
						{/if}
					{:else}
						<ExperienceCardSkeleton />
						<ExperienceCardSkeleton />
						<ExperienceCardSkeleton />
					{/if}
				{:else if category === 'monuments'}
					{#if !usersMonuments}
						<MonumentCardSkeleton size="normal" />
						<MonumentCardSkeleton size="normal" />
						<MonumentCardSkeleton size="normal" />
					{:else if usersMonuments.length}
						{#each usersMonuments as monument}
							<MonumentCardComponent size="normal" {monument} />
						{/each}
					{:else}
						<Skeleton divClass="w-full" />
						{#if isMyAccount}
							<CreateYourFirstMonumentButton />
						{/if}
					{/if}
				{/if}
			</Column>
		</Column>
	</Column>
{/if}
