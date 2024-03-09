<script lang="ts">
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import SuccessCard from '$lib/components/Cards/SuccessCard.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import ProgressBar from '$lib/components/Common/ProgressBar.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';
	import IconCheck from '$lib/components/Icons/IconCheck.svelte';
	import IconList from '$lib/components/Icons/IconList.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentCard, TCheckpointCompletionGraphqlDocument } from '@app/ts-types';
	import { normalizeMeters } from '@app/utils';
	import { distanceTo, headingDistanceTo } from 'geolocation-utils';
	import CheckpointsListDrawer from '../Components/CheckpointsListDrawer.svelte';
	import TourCheckpointAccomplishment from '../Components/TourCheckpointAccomplishment.svelte';
	import type { PageData } from './$types';
	import IconLocationArrow from '$lib/components/Icons/IconLocationArrow.svelte';
	import BubbleIconWrapper from '$lib/components/Icons/BubbleIconWrapper.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let tour = data.tour;

	let listHidden = true;
	let distanceToAccomplishMonument = data.minimalDistanceToAccomplishMonument;
	$: isTourFinished = monumentsToAccomplish.length === 0;
	let tourAccomplishCardHidden = true;

	let allMonuments: MonumentCard[] = data.tour.monuments;

	let accomplishedCheckpoints: TCheckpointCompletionGraphqlDocument[] =
		data.tour.usersCheckpointsCompletionData;
	let closestMonument: MonumentCard | undefined = undefined;

	let monumentsToAccomplish = allMonuments.filter(
		(item) => !accomplishedCheckpoints.find((checkpoint) => checkpoint.monumentId === item._id)
	);
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
					initialTourPicture: allMonuments.at(0)?.pictureURL ?? '',

					...data.tour
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

<Columns
	columns="1fr 3fr 1fr"
	class="absolute bottom-0 w-full h-auto p-2 child:flex child:justify-self-center "
>
	<Icon
		on:click={() => (listHidden = false)}
		class="child:w-10 child:h-10 p-2 rounded-full bg-green-400 child:fill-white "
	>
		<IconList />
	</Icon>
	<Row class="gap-2 justify-center w-full">
		{#if distanceToClosestMonument && !isTourFinished}
			<Text class="font-bold  text-center"
				>{`${$LL.page.tour.distanceToNextTargetLabel()} ${normalizeMeters(
					distanceToClosestMonument
				)}`}</Text
			>
		{/if}
		<ProgressBar
			class="w-full"
			progress={allMonuments.length - monumentsToAccomplish.length}
			labelInside
			showWrittenProgress
			max={allMonuments.length}
		/>
	</Row>

	<BubbleIconWrapper on:click={() => (tourAccomplishCardHidden = false)} class="">
		<IconLocationArrow />
	</BubbleIconWrapper>
</Columns>
