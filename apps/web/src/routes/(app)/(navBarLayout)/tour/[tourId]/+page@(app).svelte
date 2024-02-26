<script lang="ts">
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import SuccessCard from '$lib/components/Cards/SuccessCard.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import ProgressBar from '$lib/components/Common/ProgressBar.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';
	import IconList from '$lib/components/Icons/IconList.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Experience, MonumentCard } from '@app/ts-types';
	import { normalizeMeters } from '@app/utils';
	import { distanceTo } from 'geolocation-utils';
	import CheckpointsListDrawer from '../Components/CheckpointsListDrawer.svelte';
	import TourNavigateToAccomplishMonumentCard from '../Components/TourNavigateToAccomplishMonumentCard.svelte';
	import type { PageData } from './$types';
	import Column from '$lib/components/Common/Column.svelte';

	export let data: PageData;

	export let listHidden = true;
	export let distanceToAccomplishMonument = data.minimalDistanceToAccomplishMonument;
	$: isTourFinished = monumentsToAccomplish.length === 0;
	let tourAccomplishCardHidden = true;
	export let allMonuments: MonumentCard[] = data.tour.monuments;
	export let accomplihedExperiences: Experience[] = data.tour.monuments.flatMap(
		(monument) => monument.usersConnectedExperiences
	);
	let closestMonument: MonumentCard | undefined = undefined;

	$: monumentsToAccomplish = allMonuments.filter(
		(item) => !accomplihedExperiences.find((exp) => exp.connectedMonumentId === item._id)
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

	$: distanceToClosestMonument =
		userCurrentLocation && closestMonument
			? distanceTo(userCurrentLocation, closestMonument.location)
			: undefined;

	$: if (
		distanceToClosestMonument &&
		distanceToClosestMonument < data.minimalDistanceToAccomplishMonument
	) {
		tourAccomplishCardHidden = false;
	}

	const accomplish = async () => {
		try {
			if (!closestMonument) throw new Error('closestMonument not defined');
			if (!userCurrentLocation) throw new Error('userCurrentLocation not defined');

			const createdExperience = (
				await sdk.createExperience({
					input: {
						connnectedMonumentId: closestMonument._id,
						location: userCurrentLocation,
						picture: null //without the picture
					}
				})
			).createExperience;
			accomplihedExperiences = [...accomplihedExperiences, createdExperience];
		} catch (error) {
			alert('Error', '', { color: 'red' });
		}
	};
</script>

{#if closestMonument && distanceToClosestMonument}
	<TourNavigateToAccomplishMonumentCard
		bind:cardHidden={tourAccomplishCardHidden}
		distanceToMonument={distanceToClosestMonument}
		distanceToReachMonument={distanceToAccomplishMonument}
		on:accomplish={accomplish}
		bind:monument={closestMonument}
	/>
{/if}

{#if isTourFinished}
	<SuccessCard class="absolute m-2 z-50 top-0">
		<Column>
			<TourCardComponent
				class=""
				data={{
					img: allMonuments.at(0)?.pictureURL ?? '',
					tourName: data.tour.tourName,
					creator: data.tour.creator
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

<CheckpointsListDrawer disableEditing bind:chosen={allMonuments} bind:hidden={listHidden} />

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

	<ButtonNext on:click={() => (tourAccomplishCardHidden = false)} class="" />
</Columns>
