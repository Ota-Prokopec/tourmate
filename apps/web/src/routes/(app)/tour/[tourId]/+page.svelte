<script lang="ts">
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import IconList from '$lib/components/Icons/IconList.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import type { MonumentCard } from '@app/ts-types';
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

	export let data: PageData;

	export let searchHidden = true;
	export let listHidden = true;
	export let saveHidden = true;

	let showNavigationCard = false;

	export let monuments: MonumentCard[] = data.tour.monuments;

	let userCurrentLocation = $lsStore.usersLocation;
	$: userCurrentLocation = $lsStore.usersLocation;

	let isSaving = false;
	let saved: false | { tourName: string } = false;

	let closestMonument: MonumentCard | undefined = undefined;

	$: if (userCurrentLocation)
		closestMonument = monuments
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

	const navigateToAccomplish = () => {
		navi;
	};
</script>

{#if closestMonument && showNavigationCard}
	<TourNavigateToAccomplishMonumentCard
		on:navigate={navigateToAccomplish}
		on:dismiss={() => (showNavigationCard = false)}
		monument={closestMonument}
	/>
{/if}

<Map showUser userProfilePicture={data.user.profilePictureURL}>
	{#each monuments as monument}
		<MonumentMarker disableShowingDetails {monument} />
	{/each}
</Map>

<CheckpointsSearchDrawer bind:chosen={monuments} bind:hidden={searchHidden} />
<CheckpointsListDrawer disableEditing bind:chosen={monuments} bind:hidden={listHidden} />

<Columns columns="1fr 3fr 1fr" class="absolute bottom-0 w-full h-auto justify-between p-2">
	<Icon
		on:click={() => (listHidden = false)}
		class="child:w-10 child:h-10 p-2 rounded-full bg-green-400 child:fill-white "
	>
		<IconList />
	</Icon>
	{#if distanceToClosestMonument}
		<Text class="font-bold"
			>{`${$LL.page.tour.distanceToNextTargetLabel()} ${normalizeMeters(
				distanceToClosestMonument
			)}`}</Text
		>
	{/if}
	<ButtonNext on:click={() => (saveHidden = false)} class="" />
</Columns>
