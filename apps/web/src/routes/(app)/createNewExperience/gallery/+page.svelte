<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Common/Button.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import { navigate } from '$lib/utils/navigator';
	import { picture } from '../editPicture/pictureStore';

	const imageHandler = (base64: string) => {
		$picture = base64;
		goto(`/createNewExperience/editPicture`);
	};
</script>

<Center class="h-full">
	<Column class="w-max justify-center items-center">
		<BasicImageInput
			on:image={(e) => imageHandler(e.detail.base64)}
			class="max-w-[500px] w-[100vw] h-auto min-h-[300px]"
		/>
		<Button on:click={() => navigate(-1)} class="max-w-[300px] w-full">cancel</Button>
	</Column>
</Center>
