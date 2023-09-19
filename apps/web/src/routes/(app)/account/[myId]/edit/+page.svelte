<script lang="ts">
	import type { PageData } from './$types';
	import Input from '$lib/components/Common/Input.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import { updateProfilePicture } from '$lib/utils/account/updateProfilePicture';
	import { Button } from 'flowbite-svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { collections } from '@app/appwrite-client';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';

	export let data: PageData;

	let username = data.userProfile.username;
	let isLoading = false;
	let successAlert = false;
	$: disabled = username === data.userProfile.username;

	const changeProfilePic = async (file: File) => {
		await updateProfilePicture(
			data.user.userId,
			data.userProfile._id,
			data.userProfile.profilePictureURL,
			file
		);
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

<div class="w-full h-auto flex flex-wrap flex-row justify-center gap-4 mt-4 p-2 max-w-[400px]">
	<AvatarImageInput
		screenErrors
		class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
		imageURL={data.userProfile.profilePictureURL}
		on:image={async ({ detail: { file } }) => {
			changeProfilePic(file);
		}}
	/>
	<Input bind:value={username} class="w-full" floatingLabel="jméno" />
	<Input disabled bind:value={data.userProfile.myId} class="w-full" floatingLabel="experienceId" />
	<Button on:click={saveChanges} {disabled} color="green" class="mt-8">
		{#if isLoading}
			<Loading />
		{:else}
			save
		{/if}
	</Button>
</div>
