<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import TakePhotoFromPhone from '$lib/components/Photo/TakePhotoFromPhone.svelte';
	import { storage } from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import { device, fileToBase64 } from '@app/utils';

	const imageHandler = async (file: File) => {
		const location = storage.usersLocation;
		if (!location) throw new Error('user has no location');

		const base64 = await fileToBase64(file);

		storage.newExperiencePicture = base64;
		navigate(`/createNewExperience/${location.at(0)}-${location.at(1)}`);
	};

	console.log(device.recognizeWidth());
</script>

{#if device.recognizeWidth() !== 'mobile'}
	<TakePhotoFromPhone on:cancel={() => navigate(-1)} on:image={(e) => imageHandler(e.detail)} />
{/if}

<MediaQuery class="w-full h-full" size="mobile">
	<Center class="w-full h-full fixed top-0 left-0 bg-black !z-[9999]">
		<TakePhoto quality={40} on:image={(e) => imageHandler(e.detail.file)} />
	</Center>
</MediaQuery>
