<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import IconQuestion from '$lib/components/Icons/IconQuestion.svelte';
	import {
		isQuestionTypeNumber,
		isQuestionTypeRadio,
		isQuestionTypeText,
		type Question,
		type QuestionType
	} from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import TextForm from './Forms/TextForm.svelte';
	import RadioForm from './Forms/RadioForm.svelte';
	import NumberForm from './Forms/NumberForm.svelte';

	export let question: Question<QuestionType> | undefined;
</script>

<Button on:click class="shadow-[0px_0px_2px_2px_gray] w-full h-40 rounded-2xl z-20">
	{#if typeof question === 'undefined'}
		<Text>Add a question</Text>
	{:else}
		<Column class="w-full opacity-80 hover:opacity-40">
			<Text>{question.question}</Text>
			{#if isQuestionTypeRadio(question)}
				<RadioForm
					class="pointer-events-none w-full"
					disableCounter
					answers={question.pickingAnswers}
					chosenAnswer={question.answer}
				/>
			{:else if isQuestionTypeNumber(question)}
				<NumberForm class="pointer-events-none w-full" answer={question.answer} />
			{:else if isQuestionTypeText(question)}
				<TextForm class="pointer-events-none w-full" answer={question.answer} />
			{/if}
		</Column>
	{/if}
</Button>
