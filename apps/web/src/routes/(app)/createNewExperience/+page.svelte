<script lang="ts">
	import lsStore from '$lib/utils/lsStore';
	import { getPlaceDetailsByLatAndLong } from '@app/utils';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { myNewExperienceStore } from './newExperienceStore';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { sdk } from '$src/graphql/sdk';

	//const { imgSrc } = $myNewExperienceStore;
	const location = $lsStore.usersLocation;

	$: placeDetailsPromise = location ? getPlaceDetailsByLatAndLong(location[0], location[1]) : null;

	// const editingDone = () => {
	// 	if (!location) throw new Error('location is not available');
	// 	goto(`/createNewExperience/save/${location[0]}-${location[1]}`);
	// };

	const save = () => {
		sdk.createExperience({
			input: {
				location: [0, 0],
				picture: '',
				placeName: 'horni záhoří'
			}
		});
	};
</script>

{#await placeDetailsPromise}
	<FullPageLoading />
{:then placeDetails}
	<ImageEditor placeName={placeDetails?.name} url={$myNewExperienceStore.imgSrc}>
		<Button
			slot="button"
			on:click={save}
			class="h-14 flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl pr-6 pl-6 m-2 rounded-full fill-white"
			color="blue">Create <Icon><IconNext /></Icon></Button
		>
	</ImageEditor>
{/await}

<style>
</style>
