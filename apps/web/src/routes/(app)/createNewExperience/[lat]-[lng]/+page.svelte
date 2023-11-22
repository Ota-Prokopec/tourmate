<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import { navigate } from '$lib/utils/navigator';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
	import { Button, Card, Img } from 'flowbite-svelte';
	import { picture } from '../editPicture/pictureStore';
	import type { PageData } from './$types';
	import Center from './Components/Center.svelte';
	import Footer from './Components/Footer.svelte';
	import Header from './Components/Header.svelte';
	import Drawer from './Components/MonumentNotFoundDrawer.svelte';
	import { maximalRangeInMetersToConnectMonumentToPicture } from './options';

	export let data: PageData;
	let isLoading = false;

	const location = data.newExperience.location;
	let hideDrawer = true;
	let monumentToConnectPromise: Promise<{ getMonument: MonumentCard }> | undefined;
	let monumentToConnect: MonumentCard | undefined;
	$: monumentToConnectPromise?.then((data) => {
		monumentToConnect = data.getMonument;
	});

	let connectedMonumentId: string | undefined = undefined;

	let isUserCloseEnoughToMonument: boolean = false;

	const save = async () => {
		if (!location) throw new Error('user has no location');
		if (!connectedMonumentId) throw new Error('no monument is connected');

		await sdk.createExperience({
			input: {
				connnectedMonumentId: connectedMonumentId,
				location: location,
				picture: $picture
			}
		});
		navigate('/');
	};

	const chooseMonument = async (monumentId: string) => {
		monumentToConnectPromise = sdk.getMonumentCard({ id: monumentId });
	};

	const connectToMonument = async (monumentId: string, distanceInMeters: number) => {
		if (distanceInMeters > maximalRangeInMetersToConnectMonumentToPicture) {
			alert(
				$LL['notAbleToConnectMonumentBecauseOfDistanceErrorTitle'](),
				$LL['notAbleToConnectMonumentBecauseOfDistanceErrorMessage'](),
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
		<Header {location} placeName={data.newExperience.placeName} />

		<Img src={$picture} />

		<Center
			on:disconnect={disconnectMonument}
			on:connect={(e) => connectToMonument(e.detail.monumentId, e.detail.distanceInMeters)}
			{monumentToConnectPromise}
			{monumentToConnect}
			bind:cardShown
			bind:hideDrawer
		/>

		<Footer {isUserCloseEnoughToMonument} monument={monumentToConnect} {isLoading} on:save={save} />
	</Card>
{/if}

<MediaQuery size="mobile">
	{#if !cardShown}
		<Button on:click={() => (cardShown = true)} color="blue" class="absolute bottom-0 m-2 z-20"
			>back to card</Button
		>
	{/if}
</MediaQuery>

<Map location={data.newExperience.location} class="h-full w-full fixed top-0">
	{#each data.newExperience.nearMonuments as monument}
		<MonumentMarker
			disableShowingDetails
			on:click={() => (cardShown = true)}
			on:click={() => chooseMonument(monument._id)}
			{monument}
		/>
	{/each}
</Map>
