<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
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
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import {
		type TMonumentCardWithQuestion,
		isQuestionTypeNumber,
		isQuestionTypeRadio,
		isQuestionTypeText,
		type Nullable,
		type Question,
		type UsersAnswer
	} from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import QuestionAnsweredCorrectlyCard from './QuestionAnsweredCorrectlyCard.svelte';
	import QuestionAnsweredWrongCard from './QuestionAnsweredWrongCard.svelte';

	export let isLoading: boolean;
	export let hidden = true;

	export let monument: TMonumentCardWithQuestion;
	export let question: Question = monument.question;

	let textAnswer: string = '';
	let numberAnswer: number = 0;
	let radioAnswer: string = '';

	const answerQuestion = async (param: {
		textAnswer: string | undefined;
		numberAnswer: number | undefined;
		radioAnswer: string | undefined;
	}) => {
		try {
			isLoading = true;
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

			const usersAnswer = (
				await sdk.answerQuestion({
					answer: answer,
					monumentId: monument?._id
				})
			).answerQuestion;

			//only thing you have to do is to bind monument to this monument
			monument.usersAnswerToQuestion = usersAnswer;
		} catch (error) {
			alert('', $LL.page.createNewExperience.Footer.answerQuestionError(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

<Drawer
	bind:hidden
	placement="auto"
	class="!z-50 w-full sm:max-w-[400px]  mobile:h-[calc(100%-100px)] fixed mobile:top-[100px]"
>
	{#if monument.usersAnswerToQuestion?.answeredCorrectly}
		<QuestionAnsweredCorrectlyCard />
	{:else if monument.usersAnswerToQuestion && !monument.usersAnswerToQuestion.answeredCorrectly}
		<QuestionAnsweredWrongCard />
	{:else}
		<Column class="justify-center items-center">
			<Text>{question.question}</Text>
			{#if isQuestionTypeText(question)}
				<TextForm type="answering" bind:answer={textAnswer} />
			{:else if isQuestionTypeNumber(question)}
				<NumberForm type="answering" bind:answer={numberAnswer} />
			{:else if isQuestionTypeRadio(question)}
				<RadioForm
					type="answering"
					answers={question.pickingAnswers}
					bind:chosenAnswer={radioAnswer}
				/>
			{/if}

			<Button
				on:click={() =>
					answerQuestion({
						textAnswer,
						numberAnswer,
						radioAnswer
					})}
				color="green"
			>
				{#if isLoading}
					<Loading />
				{:else}
					{$LL.component.AnswerQuestionDrawer.answer()}
				{/if}
			</Button>
		</Column>
	{/if}
</Drawer>
