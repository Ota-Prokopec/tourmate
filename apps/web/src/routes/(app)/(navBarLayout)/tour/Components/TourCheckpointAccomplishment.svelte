<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import ScanningAnimation from '$lib/components/Common/ScanningAnimation.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { isMonumentWithQuestion, type MonumentCard } from '@app/ts-types';
	import { normalizeMeters } from '@app/utils';
	import { Button } from 'flowbite-svelte';
	import AnswerQuestionDrawer from '../../createNewExperience/[lat]-[lng]/Components/AnswerQuestionDrawer.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ accomplish: undefined; test: undefined }>();

	dispatch('test');

	export let monument: MonumentCard;
	let question = monument.question;
	export let distanceToMonument: number;
	export let distanceToReachMonument: number;
	export let cardHidden: boolean = true;

	export let answerQuestionDrawerHidden = true;

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
		dispatch('accomplish');
	}
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

		{#if isMonumentWithQuestion(monument) && !monument.usersAnswerToQuestion?.answeredCorrectly}
			<Button
				disabled={monument.usersAnswerToQuestion?.answeredCorrectly === false}
				color="green"
				on:click={() => (answerQuestionDrawerHidden = false)}
			>
				answer question (overwrite)
			</Button>
		{/if}

		{#if isMonumentWithQuestion(monument)}
			<AnswerQuestionDrawer
				bind:hidden={answerQuestionDrawerHidden}
				isLoading={false}
				bind:monument
			/>
		{/if}

		<ScanningAnimation />
	</Column>
</Drawer>
