<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import CongratulationCard from '$lib/components/Common/SuccessCard.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import NumberForm from '$lib/components/Experience-monument/question/Forms/NumberForm.svelte';
	import RadioForm from '$lib/components/Experience-monument/question/Forms/RadioForm.svelte';
	import TextForm from '$lib/components/Experience-monument/question/Forms/TextForm.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import {
		isQuestionTypeNumber,
		isQuestionTypeRadio,
		isQuestionTypeText,
		type Answer,
		type AnswerType,
		type Question,
		type UsersAnswer,
		type Nullable
	} from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import SuccessCard from '$lib/components/Common/SuccessCard.svelte';
	import FailureCard from '$lib/components/Common/FailureCard.svelte';

	const dispatch = createEventDispatcher<{
		answer: {
			textAnswer: string | undefined;
			numberAnswer: number | undefined;
			radioAnswer: string | undefined;
		};
	}>();

	export let isLoading: boolean;
	export let hidden = true;
	export let usersAnswer: Nullable<Pick<UsersAnswer, 'answeredCorrectly'>>;

	export let question: Omit<Question<AnswerType>, 'pickingAnswers'> & {
		pickingAnswers?: Answer['pickingAnswers'];
	};

	let textAnswer: string = '';
	let numberAnswer: number = 0;
	let radioAnswer: string = '';

	const answer = () => {
		dispatch('answer', {
			textAnswer,
			numberAnswer,
			radioAnswer
		});
	};
</script>

<Drawer
	bind:hidden
	placement="auto"
	class="!z-50 w-full max-w-[400px] mobile:h-[calc(100%-100px)] fixed mobile:top-[100px]"
>
	<MediaQuery size="mobile">
		<Right>
			<Icon on:click={() => (hidden = true)} class="child:h-10 child:w-10">
				<IconTimes />
			</Icon>
		</Right>
	</MediaQuery>

	{#if usersAnswer?.answeredCorrectly}
		<SuccessCard class="w-full h-auto min-h-[400px] ">
			<Column class="gap-0 mt-10">
				<Text class="text-green-400 ">
					{$LL.congratulationForAnsweringTheQuestionCorrectly()}
				</Text>
				<Text class="">
					{$LL.nowYouCanTakeAPictureWithTheMonument()}
				</Text>
			</Column>
		</SuccessCard>
	{:else if usersAnswer && !usersAnswer.answeredCorrectly}
		<FailureCard class="w-full h-auto min-h-[400px] ">
			<Column class="gap-0 mt-10">
				<Text class="">
					{$LL.answeredTheQuestionWrong()}
				</Text>
				<Text class="">
					{$LL.notAbleToTakeAPictureWithTheMonument()}
				</Text>
			</Column>
		</FailureCard>
	{:else}
		<Column class="justify-center items-center">
			<Text>{question.question}</Text>
			{#if isQuestionTypeText(question)}
				<TextForm bind:answer={textAnswer} />
			{:else if isQuestionTypeNumber(question)}
				<NumberForm bind:answer={numberAnswer} />
			{:else if isQuestionTypeRadio(question)}
				<RadioForm answers={question.pickingAnswers} bind:chosenAnswer={radioAnswer} />
			{/if}

			<Button on:click={answer} color="green">
				{#if isLoading}
					<Loading />
				{:else}
					{$LL.answer()}
				{/if}
			</Button>
		</Column>
	{/if}
</Drawer>
