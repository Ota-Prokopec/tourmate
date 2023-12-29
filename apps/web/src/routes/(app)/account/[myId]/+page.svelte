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
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import type { Base64, MonumentCard } from '@app/ts-types';
	import EditProfileButton from '../../../../lib/components/Buttons/EditProfileButton.svelte';
	import type { PageData } from './$types';
	import ExperienceSection from './Components/ExperienceSection.svelte';
	import MonumentsSection from './Components/MonumentsSection.svelte';

	export let data: PageData;
	const { usersProfile } = data;

	let usersMonuments: MonumentCard[] | undefined = undefined;

	let category: 'monuments' | 'experiences' = 'experiences';

	$: isMyAccount = data.user.userId === usersProfile?.userId;

	const categories = [
		{ title: $LL.page.account.pictures(), key: 'experiences' },
		{ title: $LL.page.account.monuments(), key: 'monuments' }
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
		if (!usersProfile) throw new Error('usersProfile is not defined');
		usersProfile.profilePictureURL = profilePictureURL;
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
	<Column class="p-2">
		<div class="w-full h-auto flex flex-wrap flex-row gap-2 items-start">
			{#if isMyAccount}
				<AvatarImageInput
					screenErrors
					class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
					imageURL={usersProfile?.profilePictureURL}
					on:image={async ({ detail: { base64 } }) => {
						openProfilePicEditor(base64);
					}}
				/>
			{:else}
				<Avatar size="xl" class="h-40 w-40 overflow-hidden" src={usersProfile?.profilePictureURL} />
			{/if}
			<Row class="justify-start p-3 gap-4 mt-2 text-2xl">
				{#if usersProfile}
					<Text>{usersProfile.myId}</Text>
				{:else}
					<SkeletonLine class="w-[180px] h-4" />
				{/if}
				{#if isMyAccount}
					<Icon on:click={() => goto(`${usersProfile?.myId}/settings`)} icon="fa fa-gear" />
				{/if}
			</Row>
		</div>
		{#if usersProfile}
			<Text class="text-3xl p-4">{usersProfile?.username}</Text>
		{:else}
			<SkeletonLine class="w-[240px] h-4" />
		{/if}

		{#if isMyAccount && usersProfile}
			<EditProfileButton myId={usersProfile?.myId} />
		{/if}

		<Column class="mb-2 gap-4">
			<CategoryPicker {categories} bind:chosenCategory={category} />

			<Column class="gap-10 justify-center items-center">
				{#if category === 'experiences'}
					<ExperienceSection
						userId={data.usersProfile.userId}
						{isMyAccount}
						cardsLimit={data.cardsLimit}
					/>
				{:else if category === 'monuments'}
					<MonumentsSection
						userId={data.usersProfile.userId}
						{isMyAccount}
						cardsLimit={data.cardsLimit}
					/>
				{/if}
			</Column>
		</Column>
	</Column>
{/if}
