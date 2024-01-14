<script lang="ts">
	import { goto } from '$app/navigation';
	import CancelButton from '$lib/components/Buttons/CancelButton.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import { lsStore, storage } from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import { pictureStore } from '../pictureStore';

	const imageHandler = (base64: string) => {
		const location = storage.usersLocation;
		if (!location) throw new Error('user has no location');

		storage.newExperiencePicture = base64;
		navigate(`/createNewExperience/${location.at(0)}-${location.at(1)}`);
	};
</script>

<Center class="h-full">
	<Column class="w-max justify-center items-center">
		<BasicImageInput
			on:image={(e) => imageHandler(e.detail.base64)}
			class="max-w-[500px] w-[100vw] h-auto min-h-[300px]"
		/>
		<CancelButton on:click={() => navigate(-1)} />
	</Column>
</Center>
