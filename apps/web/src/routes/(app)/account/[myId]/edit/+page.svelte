<script lang="ts">
	import { goto } from '$app/navigation';
	import { collections } from '$lib/appwrite/appwrite';
	import SaveButton from '$lib/components/Buttons/SaveButton.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import ProfilePictureEditor from '$lib/components/Common/ProfilePictureEditor.svelte';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import MyIdInput from '$lib/components/Inputs/MyIdInput.svelte';
	import UsernameInput from '$lib/components/Inputs/UsernameInput.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Base64 } from '@app/ts-types';
	import type { PageData } from './$types';
	import { navigate } from '$lib/utils/navigator';

	export let data: PageData;

	let username = data.userProfile.username;
	let myId = data.userProfile.myId;
	let isLoading = false;
	$: disabled = username === data.userProfile.username && myId === data.userProfile.myId;

	let screenProfilePicEditor = false;
	let newProfilePicture: string | Base64 = '';
	let uploadingProfilePictureIsLoading = false;

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
			alert('', $LL.page.account.edit.updateProfilePictureErrorMessage(), {
				color: 'red'
			});
		}
	};

	const saveChanges = async () => {
		try {
			isLoading = true;
			await collections.userInfo.updateDocument(data.userProfile._id, {
				username,
				myId
			});
			navigate(`/account/${myId}`, { invalidateAll: true });
		} catch (error) {
			alert('', $LL.page.account.edit.updateProfileErrorMessage(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

<Center>
	<Column class="items-center w-full max-w-[400px] justify-center gap-4 mt-4 p-2">
		<AvatarImageInput
			screenErrors
			class="!w-40 !h-40 bg-cover bg-center !rounded-full relative overflow-hidden "
			imageURL={data.userProfile.profilePictureURL}
			on:image={async ({ detail: { base64 } }) => {
				updateProfilePicture(base64);
			}}
		/>
		<UsernameInput bind:value={username} />
		<MyIdInput bind:myId />
		<SaveButton bind:isLoading on:click={saveChanges} />
	</Column>
</Center>
