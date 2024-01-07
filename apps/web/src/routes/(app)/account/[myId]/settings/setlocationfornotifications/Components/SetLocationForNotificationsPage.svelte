<script lang="ts">
	import { Queries, collections } from '$lib/appwrite/appwrite';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Full from '$lib/components/Common/Full.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { owner } from '@app/appwrite-permissions';
	import type { Location } from '@app/ts-types';
	import { normalizeMeters } from '@app/utils';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ back: undefined }>();

	export let userCenter: Location | undefined = undefined;
	let range = 45 * 1000; //in meters ans it is only the half of the circle so r = 90_000m

	$: document = useQuery('locationForNotificaiton_get', async () => {
		return await collections.locationForNotification.getDocument([
			Queries.locationForNotification.equal('userId', userId)
		]);
	});

	let currentLocation: Location | undefined;
	$: currentLocation = $document.data
		? [$document.data?.latitude, $document.data?.longitude]
		: undefined;

	let markerLocation: Location | undefined = currentLocation;

	let isLoading = false;
	export let userId: string;

	//zoom = 20 => w-200px => widthInReal = 10m

	const circleR = 90 * 1000;

	const save = async () => {
		isLoading = true;
		try {
			if (!markerLocation) throw new Error('Marker location is not defined');
			const [latitude, longitude] = markerLocation;

			if (!$document.data) {
				await collections.locationForNotification.createDocument(
					{
						userId: userId,
						latitude,
						longitude
					},
					owner(userId)
				);
			} else {
				await collections.locationForNotification.updateDocument($document.data.$id, {
					userId: userId,
					latitude,
					longitude
				});
			}

			dispatch('back');
		} catch (error) {
			alert('', $LL.component.SetLocationForNotificationsPage.errorMessage(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

<Full class="justify-center flex">
	<Map
		on:load={(e) => (markerLocation = e.detail.userCenter)}
		bind:userCenter
		minZoom={6}
		maxZoom={6}
	>
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
			{#if currentLocation}
				<Card>
					<Text>
						{$LL.component.SetLocationForNotificationsPage.yourLocationIsCurrently_InRangeOf_({
							location: currentLocation,
							range: normalizeMeters(range)
						})}
					</Text>
				</Card>
			{/if}

			<Text class="text-lg text-center"
				>{$LL.component.SetLocationForNotificationsPage.chooseYourLocationForNotifications()}</Text
			>
			<Right class="gap-2">
				<Button on:click={() => dispatch('back')} disable={!markerLocation} color="red">
					{$LL.component.SetLocationForNotificationsPage.cancel()}
				</Button>
				<Button on:click={save} disable={!markerLocation} color="green">
					{#if isLoading}
						<Loading />
					{:else}
						{$LL.component.SetLocationForNotificationsPage.save()}
					{/if}
				</Button>
			</Right>
		</Column>
	</Alert>
</Full>
