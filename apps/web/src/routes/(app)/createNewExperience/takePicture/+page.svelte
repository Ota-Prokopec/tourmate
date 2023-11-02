<script lang="ts">
	import { goto } from '$app/navigation';
	import TakePhotoFromPhone from '$lib/components/Photo/TakePhotoFromPhone.svelte';
	import { navigate } from '$lib/utils/navigator';
	import { fileToBase64 } from '@app/utils';
	import { myNewExperienceStore } from '../editPicture/newExperienceStore';

	const imageHandler = async (file: File) => {
		console.log(file.size);

		const base64 = await fileToBase64(file);
		$myNewExperienceStore.imgSrc = base64;
		//goto(`/createNewExperience/editPicture`);
	};
</script>

<TakePhotoFromPhone on:cancel={() => navigate(-1)} on:image={(e) => imageHandler(e.detail)} />
