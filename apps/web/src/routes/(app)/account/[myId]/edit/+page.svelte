<script lang="ts">
	import type { PageData } from './$types';
	import Input from '$lib/components/Common/Input.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { Button } from 'flowbite-svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { collections } from '@app/appwrite-client';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Base64 } from '@app/ts-types';
	import ProfilePictureEditor from '$lib/components/Common/ProfilePictureEditor.svelte';

	export let data: PageData;

	let username = data.userProfile.username;
	let isLoading = false;
	let successAlert = false;
	$: disabled = username === data.userProfile.username;

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

	const saveChanges = async () => {
		isLoading = true;
		await collections.userInfo.updateDocument(data.userProfile._id, {
			username: username
		});
		isLoading = false;
		successAlert = true;
	};
</script>

<MyAlert bind:visible={successAlert} timeout={4000} color="green" class="w-full justify-center">
	successfully changed
</MyAlert>

{#if screenProfilePicEditor}
	<ProfilePictureEditor
		isLoading={uploadingProfilePictureIsLoading}
		on:save={(e) => updateProfilePicture(e.detail.base64)}
		profilePicture={newProfilePicture}
	/>
{:else}
	<div class="w-full h-auto flex flex-wrap flex-row justify-center gap-4 mt-4 p-2 max-w-[400px]">
		<AvatarImageInput
			screenErrors
			class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
			imageURL={data.userProfile.profilePictureURL}
			on:image={async ({ detail: { base64 } }) => {
				openProfilePicEditor(base64);
			}}
		/>
		<Input bind:value={username} class="w-full" floatingLabel="jméno" />
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
				save
			{/if}
		</Button>
	</div>
{/if}
