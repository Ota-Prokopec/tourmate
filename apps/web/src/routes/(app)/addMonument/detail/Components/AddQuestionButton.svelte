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

	export let question:
		| (Omit<Question<AnswerType>, 'pickingAnswers'> & { pickingAnswers?: Answer['pickingAnswers'] })
		| undefined;
	export let disabled = false;
</script>

<Button
	{disabled}
	on:click
	class="shadow-[0px_0px_2px_2px_gray] p-2 w-full h-auto min-h-40 rounded-2xl z-20 min-h-[80px]"
>
	{#if typeof question === 'undefined'}
		<Text class="text-xl">{$LL.addQuestion()}</Text>
	{:else}
		<Column class="w-full opacity-80 hover:opacity-40">
			<Text>{question.question}</Text>
			{#if isQuestionTypeRadio(question)}
				<RadioForm
					class="pointer-events-none w-full"
					disableCounter
					answers={question.pickingAnswers}
					chosenAnswer={question.correctAnswer}
				/>
			{:else if isQuestionTypeNumber(question)}
				<NumberForm class="pointer-events-none w-full" answer={question.correctAnswer} />
			{:else if isQuestionTypeText(question)}
				<TextForm class="pointer-events-none w-full" answer={question.correctAnswer} />
			{/if}
		</Column>
	{/if}
</Button>
{#if disabled}
	<Popover color="red">
		{#if $locale === 'en'}
			We are sorry, you cant edit your question in monument, because some people could already
			answerTypeZod.
		{:else}
			Omlouváme set, ale nemůžete upravovat vaší otázku v zážitku, neboť je možné, že už na vaši
			otázku někdo odpověděl.
		{/if}
	</Popover>
{/if}
