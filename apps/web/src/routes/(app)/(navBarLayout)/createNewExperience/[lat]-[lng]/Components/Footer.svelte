<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { isMonumentWithQuestion, type MonumentCard } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import AnswerQuestionDrawer from './AnswerQuestionDrawer.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	const dispatch = createEventDispatcher<{ save: undefined }>();

	export let isUserCloseEnoughToMonument: boolean | null;
	export let isPublishingLoading: boolean;
	export let monument: MonumentCard | undefined;
	$: question = monument?.question;
	let isAnsweringLoading = false;

	$: usersAnswer = monument?.usersAnswerToQuestion;

	$: ableToAnswer = monument?.question && !usersAnswer && isUserCloseEnoughToMonument;

	$: ableToSave =
		(isUserCloseEnoughToMonument && monument && !monument.question) ||
		(isUserCloseEnoughToMonument && monument?.question && usersAnswer?.answeredCorrectly);

	let answerQuestionDrawerHidden = true;
</script>

{#if monument && isMonumentWithQuestion(monument)}
	<AnswerQuestionDrawer
		bind:monument
		isLoading={isAnsweringLoading}
		question={monument?.question}
		bind:hidden={answerQuestionDrawerHidden}
	/>
{/if}

<Column class="w-full gap-4 p-4">
	{#if monument?.question && !ableToSave}
		<Button
			disabled={!ableToAnswer}
			color="green"
			on:click={() => (answerQuestionDrawerHidden = false)}
		>
			<Column class="justify-center items-center gap-2">
				{$LL.page.createNewExperience.Footer.answerQuestion()}
				<Icon class="child:h-5 child:w-5 child:rotate-90 child:fill-white">
					<IconNext />
				</Icon>
			</Column>
		</Button>
		{#if usersAnswer?.answeredCorrectly === false}
			<Popover placement="top" color="red">
				{$LL.page.createNewExperience.Footer.cantAnswerTwice()}
			</Popover>
		{/if}
	{:else if monument?.question && usersAnswer?.answeredCorrectly === true}
		<Text>{$LL.page.createNewExperience.Footer.answeredCorrectly()}</Text>
	{/if}

	<Button color="green" on:click={() => dispatch('save')} disabled={!ableToSave}>
		{#if isPublishingLoading}
			<Loading />
		{:else}
			{$LL.page.createNewExperience.Footer.public()}
		{/if}
	</Button>

	{#if !isUserCloseEnoughToMonument && monument}
		<Popover color="red">
			{$LL.error.notAbleToConnectMonumentBecauseOfDistanceBetweenMonumentsIsTooSmallErrorMessage()}
		</Popover>
	{/if}
</Column>
