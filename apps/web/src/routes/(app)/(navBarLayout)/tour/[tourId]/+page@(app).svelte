<script lang="ts">
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import IconList from '$lib/components/Icons/IconList.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import type { Experience, MonumentCard } from '@app/ts-types';
	import CheckpointsListDrawer from '../Components/CheckpointsListDrawer.svelte';
	import CheckpointsSearchDrawer from '../Components/CheckpointsSearchDrawer.svelte';
	import CheckpointsSaveDrawer from '../Components/CheckpointsSaveDrawer.svelte';
	import type { PageData } from './$types';
	import Text from '$lib/components/Common/Text.svelte';
	import { distanceTo } from 'geolocation-utils';
	import lsStore from '$lib/utils/lsStore';
	import LL from '$src/i18n/i18n-svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import { normalizeMeters } from '@app/utils';
	import Card from '$lib/components/Common/Card.svelte';
	import TourNavigateToAccomplishMonumentCard from '../Components/TourNavigateToAccomplishMonumentCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { alert } from '$src/routes/alertStore';
	import ProgressBar from '$lib/components/Common/ProgressBar.svelte';

	export let data: PageData;

	export let searchHidden = true;
	export let listHidden = true;
	export let saveHidden = true;

	let showNavigationCard = false;

	export let allMonuments: MonumentCard[] = data.tour.monuments;
	export let accomplihedExperiences: Experience[] = data.tour.monuments.flatMap(
		(monument) => monument.usersConnectedExperiences
	);

	$: monumentsToAccomplish = allMonuments.filter(
		(item) => !accomplihedExperiences.find((exp) => exp.connectedMonumentId === item._id)
	);

	$: console.log(accomplihedExperiences);

	$: console.log(monumentsToAccomplish);

	let userCurrentLocation = $lsStore.usersLocation;
	$: userCurrentLocation = $lsStore.usersLocation;

	let closestMonument: MonumentCard | undefined = undefined;

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
		showNavigationCard = true;
	}
	showNavigationCard = true;

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
			alert('Error', '500', { color: 'red' });
		}
	};

	$: isTourFinished = monumentsToAccomplish.length === 0;
</script>

{#if closestMonument && showNavigationCard}
	<TourNavigateToAccomplishMonumentCard
		on:accomplish={accomplish}
		on:dismiss={() => (showNavigationCard = false)}
		bind:monument={closestMonument}
	/>
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
	<Row class="gap-2 justify-center">
		{#if distanceToClosestMonument && !isTourFinished}
			<Text class="font-bold  text-center"
				>{`${$LL.page.tour.distanceToNextTargetLabel()} ${normalizeMeters(
					distanceToClosestMonument
				)}`}</Text
			>
		{:else if isTourFinished}
			<Text class="font-bold text-center">{$LL.page.tour.youFinished()}</Text>
		{/if}
		<ProgressBar
			labelInside
			progress={allMonuments.length - monumentsToAccomplish.length}
			max={allMonuments.length}
		/>
	</Row>

	<ButtonNext on:click={() => (saveHidden = false)} class="" />
</Columns>
