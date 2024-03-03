<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import type { CarouselFunctions } from '$lib/components/Carousel/types';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import TextArea from '$lib/components/Common/TextArea.svelte';
	import Title from '$lib/components/Common/Title.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import {
		getQuestionType,
		isQuestionTypeNumber,
		isQuestionTypeRadio,
		isQuestionTypeText,
		type Answer,
		type AnswerType,
		type Question,
		type QuestionWithCorrectAnswerRequired
	} from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import NumberForm from '../../../../../../lib/components/Experience-monument/question/Forms/NumberForm.svelte';
	import RadioForm from '../../../../../../lib/components/Experience-monument/question/Forms/RadioForm.svelte';
	import TextForm from '../../../../../../lib/components/Experience-monument/question/Forms/TextForm.svelte';

	const dispatch = createEventDispatcher<{
		save: QuestionWithCorrectAnswerRequired;
	}>();

	export let hidden = true;

	let carousel: CarouselFunctions | undefined;

	export let question: QuestionWithCorrectAnswerRequired | undefined;

	const categories: { title: string; key: AnswerType }[] = [
		{ title: $LL.component.AddQuestionDrawer.questionTypes.radio(), key: 'radio' },
		{ title: $LL.component.AddQuestionDrawer.questionTypes.text(), key: 'text' },
		{ title: $LL.component.AddQuestionDrawer.questionTypes.number(), key: 'number' }
	];

	let carouselIndex = question
		? categories.findIndex((item) => {
				question ? item.key === question.type : false;
		  })
		: 0;

	type Key = (typeof categories)[number]['key'];

	let chosenCategory: Key = question ? question.type : 'text'; // ?? categories[0].key;

	$: chosenCategory = categories[carouselIndex]?.key ?? 'text';

	const changeFormTypeByPicker = (key: Key) => {
		if (!carousel) throw new Error('carousel has not been loaded yet');

		const index = categories.findIndex((item) => item.key === key);

		carousel.goTo(index);
	};

	let errorMessage: string | null = null;

	const save = () => {
		try {
			const temporaryQuestion = {
				type: chosenCategory,
				question: questionHelper,
				correctAnswer:
					chosenCategory === 'number'
						? numberAnswerHelper
						: chosenCategory === 'text'
						? TextAnswerHelper
						: pickingAnswerHelper,
				pickingAnswers: chosenCategory === 'radio' ? pickingAnswersHelper : undefined
			};

			if (!temporaryQuestion) throw new Error('Question does not exist');
			const [type, checkedQuestion] = getQuestionType(temporaryQuestion);
			const correctAnswer = checkedQuestion.correctAnswer;
			if (!correctAnswer) throw new Error('Correct answer does not exist');

			question = { ...checkedQuestion, correctAnswer };

			clearOthers();

			dispatch('save', question);
			hidden = true;
		} catch (err) {
			errorMessage = $LL.component.AddQuestionDrawer.saveError();
		}
	};

	const clearOthers = () => {
		if (isQuestionTypeNumber(question)) {
			clearTextInput();
			clearPickingInput();
		} else if (isQuestionTypeText(question)) {
			clearNumberInput();
			clearPickingInput();
		} else if (isQuestionTypeRadio(question)) {
			clearNumberInput();
			clearTextInput();
		}
	};

	const clearTextInput = () => (TextAnswerHelper = '');
	const clearNumberInput = () => (numberAnswerHelper = 0);
	const clearPickingInput = () => {
		pickingAnswersHelper = ['', ''];
		pickingAnswerHelper = '';
	};

	let pickingAnswersHelper: string[] = isQuestionTypeRadio(question)
		? question.pickingAnswers
		: ['', ''];
	let TextAnswerHelper = isQuestionTypeText(question) ? question.correctAnswer : '';
	let numberAnswerHelper = isQuestionTypeNumber(question) ? question.correctAnswer : 0;
	let questionHelper: string = question ? question.question : '';
	let pickingAnswerHelper: string = isQuestionTypeRadio(question) ? question.correctAnswer : '';
</script>

<Drawer
	bind:hidden
	placement="auto"
	class="z-50 fixed top-0 right-0 w-[500px] mobile:w-full mobile:h-[calc(100% - 20px)] top-[20px]"
>
	{#if errorMessage}
		<Center class="relative">
			<Alert
				on:close={() => (errorMessage = null)}
				class="w-full relative top-0"
				dismissable
				color="red"
			>
				{errorMessage}
			</Alert>
		</Center>
	{/if}

	<Column>
		<Title>{$LL.component.AddQuestionDrawer.yourQuestion()}</Title>

		<TextArea
			maxLength={500}
			letterCount
			bind:value={questionHelper}
			placeholder={$LL.component.AddQuestionDrawer.yourQuestion()}
			class="w-full"
		/>

		<CategoryPicker
			{chosenCategory}
			on:change={(e) => changeFormTypeByPicker(e.detail)}
			{categories}
		/>

		<Carousel bind:index={carouselIndex} bind:carousel swiping>
			<RadioForm
				type="creating-question"
				class="min-h-[200px] p-4"
				bind:answers={pickingAnswersHelper}
				bind:chosenAnswer={pickingAnswerHelper}
			/>
			<TextForm type="creating-question" class="min-h-[200px] p-4" bind:answer={TextAnswerHelper} />
			<NumberForm
				type="creating-question"
				class="min-h-[200px] p-4"
				bind:answer={numberAnswerHelper}
			/>
		</Carousel>
	</Column>

	<Right>
		<Button on:click={save} color="green">{$LL.component.AddQuestionDrawer.save()}</Button>
	</Right>
</Drawer>
