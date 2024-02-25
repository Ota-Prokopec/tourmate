<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL, { locale } from '$src/i18n/i18n-svelte';
	import {
		isQuestionTypeNumber,
		isQuestionTypeRadio,
		isQuestionTypeText,
		type AnswerType,
		type Question,
		type Answer
	} from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import NumberForm from '$lib/components/Experience-monument/question/Forms/NumberForm.svelte';
	import RadioForm from '$lib/components/Experience-monument/question/Forms/RadioForm.svelte';
	import TextForm from '$lib/components/Experience-monument/question/Forms/TextForm.svelte';

	export let question: Question | undefined;
	export let disabled = false;
</script>

<Button
	{disabled}
	on:click
	class="shadow-[0px_0px_2px_2px_gray] p-2 w-full h-auto min-h-40 rounded-2xl z-20 min-h-[80px]"
>
	{#if typeof question === 'undefined'}
		<Text class="text-xl">{$LL.component.AddQuestionButton.label()}</Text>
	{:else}
		<Column class="w-full opacity-80 hover:opacity-40">
			<Text>{question.question}</Text>
			{#if typeof question.correctAnswer === 'string' || typeof question.correctAnswer === 'number'}
				{#if isQuestionTypeRadio(question)}
					<RadioForm
						class="pointer-events-none w-full"
						answers={question.pickingAnswers}
						type="creating-question"
						chosenAnswer={question.correctAnswer}
					/>
				{:else if isQuestionTypeNumber(question)}
					<NumberForm
						class="pointer-events-none w-full"
						type="creating-question"
						answer={question.correctAnswer}
					/>
				{:else if isQuestionTypeText(question)}
					<TextForm
						class="pointer-events-none w-full"
						type="creating-question"
						answer={question.correctAnswer}
					/>
				{/if}
			{:else}
				the question.correctAnswer is typeof null | undefined
			{/if}
		</Column>
	{/if}
</Button>
{#if disabled}
	<Popover color="red">
		{$LL.component.AddQuestionButton.notAbleToEditQuestion()}
	</Popover>
{/if}
