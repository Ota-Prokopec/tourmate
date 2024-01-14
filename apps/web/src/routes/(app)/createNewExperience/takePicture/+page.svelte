<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import TakePhotoFromPhone from '$lib/components/Photo/TakePhotoFromPhone.svelte';
	import { lsStore, storage } from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import { fileToBase64 } from '@app/utils';
	import { pictureStore } from '../pictureStore';
	import type { PageData } from './$types';

	export let data: PageData;

	const imageHandler = async (file: File) => {
		const location = storage.usersLocation;
		if (!location) throw new Error('user has no location');
		const base64 = await fileToBase64(file);

		data.pictureStore.set(base64);

		navigate(`/createNewExperience/${location.at(0)}-${location.at(1)}`);
	};
</script>

<TakePhotoFromPhone on:cancel={() => navigate(-1)} on:image={(e) => imageHandler(e.detail)} />

<Center class="h-full">
	<Loading />
</Center>
