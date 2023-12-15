<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Full from '$lib/components/Common/Full.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Location } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from '../$types';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { goto } from '$app/navigation';
	import { navigate } from '$lib/utils/navigator';

	export let data: PageData;
	let center: Location;
	let markerLocation: Location | undefined;
	let isLoading = false;

	//zoom = 20 => w-200px => widthInReal = 10m

	const circleR = 90 * 1000;

	const save = async () => {
		isLoading = true;
		try {
			if (!markerLocation) throw new Error('Marker location is not defined');
			const [latitude, longitude] = markerLocation;

			const document = await collections.locationForNotificaiton.getDocument([
				Queries.locationForNotificaiton.equal('userId', data.user.myId)
			]);
			if (!document) {
				await collections.locationForNotificaiton.createDocument({
					userId: data.user.myId,
					latitude,
					longitude
				});
			} else {
				await collections.locationForNotificaiton.updateDocument(document.$id, {
					userId: data.user.myId,
					latitude,
					longitude
				});
			}

			//navigate(routeToContinue);
		} catch (error) {
			alert('', $LL.errorMessage(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

<Full class="justify-center flex">
	<Map on:load={(e) => (markerLocation = e.detail.center)} bind:center minZoom={6} maxZoom={6}>
		{#if markerLocation}
			<Marker
				draggable
				class="w-[200px] h-[200px] rounded-full border border-blue-500 child:hidden"
				bind:location={markerLocation}
			/>
		{/if}
	</Map>
	<Alert class="absolute bottom-0 m-2">
		<Column>
			<Text class="text-lg text-center">{$LL.chooseYourLocationForNotifications()}</Text>
			<Right>
				<Button on:click={save} disable={!markerLocation} color="green">
					{#if isLoading}
						<Loading />
					{:else}
						{$LL.save()}
					{/if}
				</Button>
				<Button on:click={save} disable={!markerLocation} color="green">
					{#if isLoading}
						<Loading />
					{:else}
						{$LL.save()}
					{/if}
				</Button>
			</Right>
		</Column>
	</Alert>
</Full>
