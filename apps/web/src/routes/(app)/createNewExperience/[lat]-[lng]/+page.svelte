<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Img, Skeleton } from 'flowbite-svelte';
	import { P, Button } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import { myNewExperienceStore } from '../editPicture/newExperienceStore';
	import { sdk } from '$src/graphql/sdk';
	import { navigate } from '$lib/utils/navigator';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { device } from '@app/utils';
	import Header from './Components/Header.svelte';
	import Center from './Components/Center.svelte';
	import Footer from './Components/Footer.svelte';
	import Drawer from './Components/Drawer.svelte';

	export let data: PageData;
	let isLoading = false;
	const img = $myNewExperienceStore.imgSrc;
	$myNewExperienceStore.imgSrc = ''; // delete the image src from store
	const location = data.newExperience.location;
	let hideDrawer = true;
	let monumentToConnectPromise: Promise<{ getMonument: MonumentCard }> | undefined;
	let connectedMonumentId: string | undefined = undefined;
	$: ableToSave = connectedMonumentId ? (connectedMonumentId.length ? true : false) : false;

	const save = async () => {
		if (!location) throw new Error('user has no location');
		if (!connectedMonumentId) throw new Error('no monument is connected');

		await sdk.createExperience({
			input: {
				connnectedMonumentId: connectedMonumentId,
				location: location,
				picture: img,
				placeName: data.newExperience.placeName
			}
		});
		navigate('/');
	};

	const screenMonument = async (monumentId: string) => {
		monumentToConnectPromise = sdk.getMonumentCard({ id: monumentId });
	};

	const connectToMonument = async (monumentId: string) => {
		connectedMonumentId = monumentId;
	};

	const disconnectMonument = () => {
		connectedMonumentId = undefined;
		monumentToConnectPromise = undefined;
	};

	let cardShown = true;
</script>

<Drawer bind:hideDrawer nearMonuments={data.newExperience.nearMonuments} />

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4 p-4">
	{#if cardShown}
		<Card class="w-full h-min sm:absolute sm:left-0 z-10">
			<Header {location} placeName={data.newExperience.placeName} />

			<Img src={img} />

			<Center
				on:disconnect={disconnectMonument}
				on:connect={(e) => connectToMonument(e.detail.monumentId)}
				{monumentToConnectPromise}
				{connectedMonumentId}
				bind:cardShown
				bind:hideDrawer
			/>

			<Footer {ableToSave} {isLoading} on:save={save} />
		</Card>
	{/if}

	{#if device.recognizeWidth() === 'mobile' && !cardShown}
		<Button on:click={() => (cardShown = true)} color="blue" class="absolute bottom-0 m-2 z-20"
			>back to card</Button
		>
	{/if}

	<Map location={data.newExperience.location} class="h-[100dvh] w-full fixed top-0">
		{#each data.newExperience.nearMonuments as monument}
			<MonumentMarker
				on:click={() => (cardShown = true)}
				on:click={() => screenMonument(monument._id)}
				{monument}
			/>
		{/each}
	</Map>
</div>
