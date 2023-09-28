<script lang="ts">
	import { sdk } from '$src/graphql/sdk';
	import lsStore from '$lib/utils/lsStore';
	import { getDetailsByLatAndLong } from '@app/utils';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import type { Base64 } from '@app/ts-types';

	//const { imgSrc } = $myNewExperienceStore;
	const location = $lsStore.usersLocation;

	const imgSrc: Base64 | string =
		'https://im9.cz/iR/importprodukt-orig/5f4/5f4fd5f97e9b6e804df2b4db59f70cfe.jpg';

	$: placeDetailsPromise = location ? getDetailsByLatAndLong(location[0], location[1]) : null;

	const save = () => {
		sdk.createExperience({
			input: {
				location: [0, 0],
				picture: imgSrc,
				placeName: 'horni záhoří',
				texts: [{ text: 'Horni záho', textStyles: 'aj' }]
			}
		});
	};
</script>

{#await placeDetailsPromise}
	<FullPageLoading />
{:then placeDetails}
	<ImageEditor placeName={placeDetails?.name} url={imgSrc} />
{/await}

<style>
</style>
