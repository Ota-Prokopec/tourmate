<script lang="ts">
	import { PUBLIC_MAX_IMAGE_SIZE_IN_MB } from '$env/static/public';
	import Center from '$lib/components/Common/Center.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import TakePhotoFromPhone from '$lib/components/Photo/TakePhotoFromPhone.svelte';
	import { storage } from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import { fileToBase64 } from '@app/utils';
	import imageCompression from 'browser-image-compression';

	const imageHandler = async (file: File) => {
		const location = storage.usersLocation;
		if (!location) throw new Error('user has no location');
		const compressedFile = await imageCompression(file, {
			maxSizeMB: parseFloat(PUBLIC_MAX_IMAGE_SIZE_IN_MB)
		});

		const base64 = await fileToBase64(compressedFile);

		storage.newExperiencePicture = base64;
		navigate(`/createNewExperience/${location.at(0)}-${location.at(1)}`);
	};
</script>

<TakePhotoFromPhone on:cancel={() => navigate(-1)} on:image={(e) => imageHandler(e.detail)} />

<Center class="h-full">
	<Loading />
</Center>
