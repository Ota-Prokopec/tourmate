<script lang="ts">
	import CardImage from '$lib/components/Experience-monument/Cards/CardImage.svelte';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import { storage } from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
	import { Button, Card } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Center from '../Components/Center.svelte';
	import Footer from '../Components/Footer.svelte';
	import Header from '../Components/Header.svelte';
	import Drawer from '../Components/MonumentNotFoundDrawer.svelte';
	import { maximalRangeInMetersToConnectMonumentToPicture } from '../options';
	import type { PageData } from './$types';
	import { base64ToFile, device, fileToBase64 } from '@app/utils';
	import { goto } from '$app/navigation';
	import AvatarImageInput from '$lib/components/ImageInputs/AvatarImageInput.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import TakePhotoFromPhone from '$lib/components/Photo/TakePhotoFromPhone.svelte';
	import ImageInput from '$lib/components/ImageInputs/ImageInput.svelte';

	//if (!$lsStore.newExperiencePicture) navigate(-1); // if there is no image return back to previous page => this happends when i goto [lat]-[lng] page and then back to this page so i have to return to page(choose picture)

	export let data: PageData;

	let isPublishingLoading = false;

	$: picture = storage.newExperiencePicture;
	const location = data.newExperience.location;
	let hideDrawer = true;
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
		if (distanceInMeters > maximalRangeInMetersToConnectMonumentToPicture) {
			alert(
				'',
				$LL.error.notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage(),
				{ color: 'yellow' }
			);
		}
		connectedMonumentId = monumentId;
		isUserCloseEnoughToMonument =
			distanceInMeters <= maximalRangeInMetersToConnectMonumentToPicture;
	};

	const disconnectMonument = () => {
		connectedMonumentId = undefined;
		monumentToConnect = undefined;
		monumentToConnectPromise = undefined;
	};

	let cardShown = true;
</script>

<Drawer bind:hideDrawer nearMonuments={data.newExperience.nearMonuments} />

{#if cardShown}
	<Card class="w-full h-auto absolute left-0 !z-20 mobile:w-full mobile:max-w-none">
		<Header {location} placeName={data.newExperience.placeName ?? 'not-loaded'} />

		{#if picture}
			<CardImage imgSrc={picture} />
		{:else if device.recognizeWidth() === 'mobile'}
			<TakePhotoFromPhone />
		{:else}
			<ImageInput
				screenErrors
				method="gallery"
				class="min-h-40"
				on:image={(e) => (picture = e.detail.base64)}
			/>
		{/if}

		<Center
			on:disconnect={disconnectMonument}
			on:connect={(e) => connectToMonument(e.detail.monumentId, e.detail.distanceInMeters)}
			{monumentToConnectPromise}
			{monumentToConnect}
			bind:cardShown
			bind:hideDrawer
		/>

		<Footer
			{isUserCloseEnoughToMonument}
			monument={monumentToConnect}
			{isPublishingLoading}
			on:save={save}
		/>
	</Card>
{/if}

<MediaQuery size="mobile">
	{#if !cardShown}
		<Button on:click={() => (cardShown = true)} color="blue" class="absolute bottom-0 m-2 z-20"
			>back to card</Button
		>
	{/if}
</MediaQuery>

<Map showUser center={data.newExperience.location} class="h-full w-full fixed top-0">
	{#each data.newExperience.nearMonuments as monument}
		<MonumentMarker
			disableShowingDetails
			on:click={() => (cardShown = true)}
			on:click={() => chooseMonument(monument._id)}
			{monument}
		/>
	{/each}
</Map>
