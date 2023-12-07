<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
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

	const anwerQuestion = async (param: {
		textAnswer: string | undefined;
		numberAnswer: number | undefined;
		radioAnswer: string | undefined;
	}) => {
		try {
			isAnsweringLoading = true;
			if (!question) throw new Error('There is no question in monument');
			if (!monument) throw new Error('Monument is not defined');
			let answer: number | string;

			if (question.type === 'text' && typeof param.textAnswer === 'string')
				answer = param.textAnswer;
			else if (question.type === 'number' && typeof param.numberAnswer === 'number')
				answer = param.numberAnswer;
			else if (question.type === 'radio' && typeof param.radioAnswer === 'string')
				answer = param.radioAnswer;
			else throw new Error('There is no answer from user');

			usersAnswer = (
				await sdk.answerQuestion({
					answer: answer,
					monumentId: monument?._id
				})
			).answerQuestion;
		} catch (error) {
			alert('', $LL.answerQuestionError(), { color: 'red' });
		}
		isAnsweringLoading = false;
	};

	let answerQuestionDrawerHidden = true;
</script>

{#if monument?.question}
	<AnswerQuestionDrawer
		isLoading={isAnsweringLoading}
		on:answer={(e) => {
			anwerQuestion(e.detail);
		}}
		{usersAnswer}
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
				answer the question
				<Icon class="child:h-5 child:w-5 child:rotate-90 child:fill-white">
					<IconNext />
				</Icon>
			</Column>
		</Button>
		{#if usersAnswer?.answeredCorrectly === false}
			<Popover placement="top" color="red">
				{$LL.cantAnswerTheQuestionTwice()}
			</Popover>
		{/if}
	{:else if monument?.question && ableToSave}
		<Text>{$LL.answeredCorrectly()}</Text>
	{/if}

	<Button color="green" on:click={() => dispatch('save')} disabled={!ableToSave}>
		{#if isPublishingLoading}
			<Loading />
		{:else}
			Zveřejnit
		{/if}
	</Button>

	{#if !isUserCloseEnoughToMonument && monument}
		<Popover color="red">
			{$LL.notAbleToConnectMonumentBecauseOfDistanceErrorMessage()}
		</Popover>
	{/if}
</Column>
