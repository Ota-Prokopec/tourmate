<script lang="ts">
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { isMonumentWithQuestion, type MonumentCard } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import AnswerQuestionDrawer from '../../createNewExperience/[lat]-[lng]/Components/AnswerQuestionDrawer.svelte';
	import ScanningAnimation from '$lib/components/Common/ScanningAnimation.svelte';
	import { normalizeMeters } from '@app/utils';
	import Drawer from '$lib/components/Common/Drawer.svelte';

	const dispatch = createEventDispatcher<{ dismiss: undefined; accomplish: undefined }>();

	export let monument: MonumentCard;
	export let distanceToMonument: number;
	export let distanceToReachMonument: number;
	export let cardHidden: boolean = true;

	export let answerQuestionDrawerHidden = true;
</script>

<Drawer
	bind:hidden={cardHidden}
	placement="auto"
	class="absolute z-50 mobile:w-full w-[80%] h-auto sm:m-[10%]"
>
	<Column class="gap-2 justify-center items-center">
		<Text
			class="font-bold text-center
    ">{$LL.component.TourNavigateToAccomplishMonumentCard.title()}</Text
		>

		<MonumentCardComponent disablePlaceLink size="tiny" {monument} />

		<Text class="text-center font-bold">
			{$LL.component.TourNavigateToAccomplishMonumentCard.distanceToIs({
				distance: normalizeMeters(distanceToMonument),
				distanceToReach: normalizeMeters(distanceToReachMonument)
			})}
		</Text>

		{#if isMonumentWithQuestion(monument) && !monument.usersAnswerToQuestion?.answeredCorrectly}
			<Button
				disabled={(monument.question &&
					monument.usersAnswerToQuestion?.answeredCorrectly === false) ||
					(monument.question && monument.usersAnswerToQuestion === null)}
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
