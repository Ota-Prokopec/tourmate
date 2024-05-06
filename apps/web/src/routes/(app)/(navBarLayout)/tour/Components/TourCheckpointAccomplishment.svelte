<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Rows from '$lib/components/Common/Rows.svelte';
	import ScanningAnimation from '$lib/components/Common/ScanningAnimation.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import {
		TTourCheckpointCompletion,
		type Location,
		type MonumentCard,
		type TourGraphqlDocument
	} from '@app/ts-types';
	import { normalizeMeters, watchUsersDegreeToTarget } from '@app/utils';

	export let monument: MonumentCard;
	export let tour: TourGraphqlDocument;
	let question = monument.question;
	export let distanceToMonument: number;
	export let distanceToReachMonument: number;
	export let cardHidden: boolean = true;
	export let userCurrentLocation: Location | null | undefined;
	export let accomplishedCheckpoints: TTourCheckpointCompletion[];

	//auto-accomplishment for monument when user is at the location
	let userHasNotAnsweredYet = question && !monument.usersAnswerToQuestion ? true : false;
	$: userHasNotAnsweredYet = question && !monument.usersAnswerToQuestion ? true : false;

	let userAnsweredCorrectly = question && monument.usersAnswerToQuestion?.answeredCorrectly;
	$: userAnsweredCorrectly = question && monument.usersAnswerToQuestion?.answeredCorrectly;

	let userCloseEnough = distanceToMonument <= distanceToReachMonument;
	$: userCloseEnough = distanceToMonument <= distanceToReachMonument;

	$: accomplishCheckpoint =
		userCloseEnough &&
		(!(question && userHasNotAnsweredYet) || !question || (question && userAnsweredCorrectly));

	$: if (accomplishCheckpoint) {
		accomplish();
	}

	const accomplish = async () => {
		try {
			if (!monument) throw new Error('closestMonument not defined');
			if (!userCurrentLocation) throw new Error('userCurrentLocation not defined');

			const createdCheckpointAccomplishment = (
				await sdk.createTourCheckpointCompletion({
					monumentId: monument._id,
					tourId: tour._id
				})
			).createTourCheckpointCompletion;
			accomplishedCheckpoints = [...accomplishedCheckpoints, createdCheckpointAccomplishment];
		} catch (error) {
			alert('Error', '500 error', { color: 'red' });
		}
	};
</script>

<Drawer
	bind:hidden={cardHidden}
	placement="auto"
	class="absolute z-50 mobile:w-full w-[80%] h-auto sm:m-[10%]"
>
	<Column class="gap-2 justify-center items-center">
		<Text
			class="font-bold text-center
    ">{$LL.component.TourCheckpointAccomplishment.title()}</Text
		>

		<MonumentCardComponent disablePlaceLink size="tiny" {monument} />

		<Text class="text-center font-bold">
			{$LL.component.TourCheckpointAccomplishment.distanceToIs({
				distance: normalizeMeters(distanceToMonument),
				distanceToReach: normalizeMeters(distanceToReachMonument)
			})}
		</Text>

		<ScanningAnimation />
	</Column>
</Drawer>
