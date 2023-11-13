<script lang="ts">
	import { goto } from '$app/navigation';
	import TakePhotoFromPhone from '$lib/components/Photo/TakePhotoFromPhone.svelte';
	import { navigate } from '$lib/utils/navigator';
	import { fileToBase64 } from '@app/utils';
	import { picture } from '../editPicture/pictureStore';
	import Center from '$lib/components/Common/Center.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';

	const imageHandler = async (file: File) => {
		const base64 = await fileToBase64(file);
		$picture = base64;
		goto(`/createNewExperience/editPicture`);
	};
</script>

<TakePhotoFromPhone on:cancel={() => navigate(-1)} on:image={(e) => imageHandler(e.detail)} />

<Center class="h-full">
	<Loading />
</Center>
