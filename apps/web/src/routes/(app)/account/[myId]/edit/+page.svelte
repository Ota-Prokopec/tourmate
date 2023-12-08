<script lang="ts">
	import { collections } from '$lib/appwrite/appwrite';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import ProfilePictureEditor from '$lib/components/Common/ProfilePictureEditor.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Base64 } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let username = data.userProfile.username;
	let isLoading = false;
	$: disabled = username === data.userProfile.username;

	let screenProfilePicEditor = false;
	let newProfilePicture: string | Base64 = '';
	let uploadingProfilePictureIsLoading = false;

	const openProfilePicEditor = (base64: Base64) => {
		screenProfilePicEditor = true;
		newProfilePicture = base64;
	};
	const updateProfilePicture = async (base64: Base64) => {
		try {
			uploadingProfilePictureIsLoading = true;
			const {
				updateProfilePicture: { profilePictureURL }
			} = await sdk.updateProfilePicture({ picture: base64 });
			data.userProfile.profilePictureURL = profilePictureURL;
			uploadingProfilePictureIsLoading = false;
			screenProfilePicEditor = false;
		} catch (error) {
			alert($LL.updateProfilePictureErrorTitle(), $LL.updateProfilePictureErrorMessage(), {
				color: 'red'
			});
		}
	};

	const saveChanges = async () => {
		try {
			isLoading = true;
			await collections.userInfo.updateDocument(data.userProfile._id, {
				username: username
			});
			goto(`/account/${data.userProfile.myId}`);
		} catch (error) {
			alert($LL.updateProfileErrorTitle(), $LL.updateProfileErrorMessage(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

{#if screenProfilePicEditor}
	<ProfilePictureEditor
		isLoading={uploadingProfilePictureIsLoading}
		on:save={(e) => updateProfilePicture(e.detail.base64)}
		profilePicture={newProfilePicture}
	/>
{:else}
	<Center>
		<Column class="items-center w-full max-w-[400px] justify-center gap-4 mt-4 p-2">
			<AvatarImageInput
				screenErrors
				class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
				imageURL={data.userProfile.profilePictureURL}
				on:image={async ({ detail: { base64 } }) => {
					openProfilePicEditor(base64);
				}}
			/>
			<Input bind:value={username} class="w-full" floatingLabel={$LL.userName()} />
			<Input
				disabled
				bind:value={data.userProfile.myId}
				class="w-full"
				floatingLabel="experienceId"
			/>
			<Button on:click={saveChanges} {disabled} color="green" class="mt-8">
				{#if isLoading}
					<Loading />
				{:else}
					{$LL.save()}
				{/if}
			</Button>
		</Column>
	</Center>
{/if}
