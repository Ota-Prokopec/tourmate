<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import { storage } from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
	import { Card } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Center from '../Components/Center.svelte';
	import Footer from '../Components/Footer.svelte';
	import Header from '../Components/Header.svelte';
	import Drawer from '../Components/MonumentNotFoundDrawer.svelte';
	import { minimalRangeInMetersToConnectMonumentToPicture } from '../options';
	import type { PageData } from './$types';

	//if (!$lsStore.newExperiencePicture) navigate(-1); // if there is no image return back to previous page => this happends when i goto [lat]-[lng] page and then back to this page so i have to return to page(choose picture)

	export let data: PageData;

	let isPublishingLoading = false;

	let picture = storage.newExperiencePicture;

	const location = data.newExperience.location;
	let hiddenCantFindMonumentDrawer = true;
	let monumentToConnectPromise: Promise<{ getMonument: MonumentCard }> | undefined;
	let monumentToConnect: MonumentCard | undefined;
	$: monumentToConnectPromise?.then((data) => {
		monumentToConnect = data.getMonument;
	});

	let connectedMonumentId: string | undefined = undefined;

	let isUserCloseEnoughToMonument: boolean | null = null;

	const save = async () => {
		try {
			isPublishingLoading = true;
			if (!location) throw new Error('user has no location');
			if (!connectedMonumentId) throw new Error('no monument is connected');
			if (!picture) throw new Error('no picture found in lsStore');

			await sdk.createExperience({
				input: {
					connnectedMonumentId: connectedMonumentId,
					location: location,
					picture: picture
				}
			});
			//storage.newExperiencePicture = undefined; i have this in +layout.svelte
			alert('', $LL.page.createNewExperience.experienceWasCreated(), { color: 'green' });
			goto('/');
		} catch (error) {
			alert('', $LL.page.createNewExperience.saveErrorMessage(), {
				color: 'red'
			});
		}

		isPublishingLoading = false;
	};

	const chooseMonument = async (monumentId: string) => {
		monumentToConnectPromise = sdk.getMonumentCard({ id: monumentId });
	};

	//is in data the id of monument that i chose?
	onMount(() => {
		if (data.newExperience.chosenMonumentId) chooseMonument(data.newExperience.chosenMonumentId);
	});

	const connectToMonument = async (monumentId: string, distanceInMeters: number) => {
		if (distanceInMeters > minimalRangeInMetersToConnectMonumentToPicture) {
			alert(
				'',
				$LL.error.notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage(),
				{ color: 'yellow' }
			);
		}
		connectedMonumentId = monumentId;
		isUserCloseEnoughToMonument =
			distanceInMeters <= minimalRangeInMetersToConnectMonumentToPicture;
	};

	const disconnectMonument = () => {
		connectedMonumentId = undefined;
		monumentToConnect = undefined;
		monumentToConnectPromise = undefined;
	};

	let cardShown = true;
</script>

<Drawer
	bind:hideDrawer={hiddenCantFindMonumentDrawer}
	nearMonuments={data.newExperience.nearMonuments}
/>

{#if cardShown}
	<Card class="w-full h-auto absolute left-0 !z-20 mobile:w-full mobile:max-w-none gap-4 ">
		<Header {location} placeName={data.newExperience.placeName ?? 'not-loaded'} />

		<BasicImageInput
			imageURL={picture}
			screenErrors
			method="gallery"
			class="min-h-40 w-full"
			on:image={(e) => (picture = e.detail.base64)}
		/>

		<Center
			on:disconnect={disconnectMonument}
			on:connect={(e) => connectToMonument(e.detail.monumentId, e.detail.distanceInMeters)}
			{monumentToConnectPromise}
			bind:cardShown
			bind:hiddenCantFindMonumentDrawer
		/>

		<Footer
			{isUserCloseEnoughToMonument}
			monument={monumentToConnect}
			{isPublishingLoading}
			on:save={save}
		/>
	</Card>
{/if}

<Map showUser userCenter={data.newExperience.location} class="h-full w-full fixed top-0">
	{#each data.newExperience.nearMonuments as monument}
		<MonumentMarker
			disableShowingDetails
			on:click={() => (cardShown = true)}
			on:click={() => chooseMonument(monument._id)}
			{monument}
		/>
	{/each}
</Map>
