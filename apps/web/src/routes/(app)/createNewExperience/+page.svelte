<script lang="ts">
	import lsStore from '$lib/utils/lsStore';
	import { getPlaceDetailsByLatAndLong } from '@app/utils';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { myNewExperienceStore } from './newExperienceStore';
	import { goto } from '$app/navigation';

	//const { imgSrc } = $myNewExperienceStore;
	const location = $lsStore.usersLocation;

	$: placeDetailsPromise = location ? getPlaceDetailsByLatAndLong(location[0], location[1]) : null;

	const editingDone = () => {
		if (!location) throw new Error('location is not available');
		goto(`/createNewExperience/save/${location[0]}-${location[1]}`);
	};
</script>

{#await placeDetailsPromise}
	<FullPageLoading />
{:then placeDetails}
	<ImageEditor
		on:next={editingDone}
		placeName={placeDetails?.name}
		url={$myNewExperienceStore.imgSrc}
	/>
{/await}

<style>
</style>
