<script lang="ts">
	import SuccessCard from '$lib/components/Cards/SuccessCard.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';
	import IconCheck from '$lib/components/Icons/IconCheck.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentCard, TCheckpointCompletionGraphqlDocument } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';
	import { distanceTo, headingDistanceTo } from 'geolocation-utils';
	import CheckpointsListDrawer from '../Components/CheckpointsListDrawer.svelte';
	import TourCheckpointAccomplishment from '../Components/TourCheckpointAccomplishment.svelte';
	import TourCompletionBottomBar from '../Components/TourCompletionBottomBar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	//let tour: Awaited<ReturnType<typeof sdk.getTour>>['getTour'] | undefined = undefined;

	$: tourQueryData = useQuery('getTour', async () => {
		return (await sdk.getTour({ tourId: data.tourId })).getTour;
	});

	let listHidden = true;
	let distanceToAccomplishMonument = data.minimalDistanceToAccomplishMonument;
	$: isTourFinished = monumentsToAccomplish.length === 0;
	let tourAccomplishCardHidden = true;

	let allMonuments: MonumentCard[] = [];
	$: allMonuments = $tourQueryData.data?.monuments || [];

	let accomplishedCheckpoints: TCheckpointCompletionGraphqlDocument[] = [];
	$: accomplishedCheckpoints = $tourQueryData.data?.usersCheckpointsCompletionData || [];

	let closestMonument: MonumentCard | undefined = undefined;

	let monumentsToAccomplish: MonumentCard[] = [];
	$: monumentsToAccomplish = allMonuments.filter(
		(item) => !accomplishedCheckpoints.find((checkpoint) => checkpoint.monumentId === item._id)
	);

	let userCurrentLocation = $lsStore.usersLocation;
	$: userCurrentLocation = $lsStore.usersLocation;

	$: if (userCurrentLocation)
		closestMonument = monumentsToAccomplish
			.toSorted((a, b) => {
				if (!userCurrentLocation) throw new Error('userCurrentLocation is not defined');
				const userFromA = distanceTo(userCurrentLocation, a.location);
				const userFromB = distanceTo(userCurrentLocation, b.location);

				return userFromA - userFromB;
			})
			.at(0);

	let distanceToClosestMonument: number | null;
	let headingToClosestMonument: number | null;

	$: if (userCurrentLocation && closestMonument) {
		const { distance, heading } = headingDistanceTo(userCurrentLocation, closestMonument.location);
		distanceToClosestMonument = distance;
		headingToClosestMonument = heading;
	}
</script>

{#if !$tourQueryData.data || $tourQueryData.isLoading}
	<FullPageLoading />
{:else}
	{@const tour = $tourQueryData.data}
	{#if closestMonument && typeof distanceToClosestMonument === 'number' && typeof headingToClosestMonument === 'number' && !tourAccomplishCardHidden}
		<TourCheckpointAccomplishment
			{headingToClosestMonument}
			bind:accomplishedCheckpoints
			{tour}
			bind:userCurrentLocation
			on:message={() => console.log('test')}
			bind:cardHidden={tourAccomplishCardHidden}
			distanceToMonument={distanceToClosestMonument}
			distanceToReachMonument={distanceToAccomplishMonument}
			bind:monument={closestMonument}
		/>
	{/if}

	{#if isTourFinished}
		<SuccessCard class="absolute m-2 z-50 top-0">
			<Column>
				<TourCardComponent
					class=""
					data={{
						initialTourPicture: tour.monuments.at(0)?.pictureURL ?? '',
						...tour
					}}
				/>
				<Text class="font-bold text-center">{$LL.page.tour.youFinished()}</Text>
			</Column>
		</SuccessCard>
	{/if}

	<Map showUser userProfilePicture={data.user.profilePictureURL}>
		{#each allMonuments as monument}
			<MonumentMarker disableShowingDetails {monument} />
		{/each}
	</Map>

	<CheckpointsListDrawer
		disableEditing
		let:monument
		bind:chosen={allMonuments}
		bind:hidden={listHidden}
	>
		<Icon class="child:fill-green-400">
			{@const isAccomplished = accomplishedCheckpoints.find(
				(checkpoint) => checkpoint.monumentId === monument._id
			)}
			{#if isAccomplished}
				<IconCheck />
			{/if}
		</Icon>
	</CheckpointsListDrawer>

	<TourCompletionBottomBar
		{distanceToClosestMonument}
		{isTourFinished}
		{allMonuments}
		{monumentsToAccomplish}
		on:showAccomplishingCard={() => (tourAccomplishCardHidden = false)}
		on:showMonumentsList={() => (listHidden = false)}
	/>
{/if}
