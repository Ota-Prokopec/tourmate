<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import type { CarouselFunctions } from '$lib/components/Carousel/types';
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Title from '$lib/components/Common/Title.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import AddQuestionButton from './AddQuestionButton.svelte';
	import RadioForm from './Forms/RadioForm.svelte';
	import TextForm from './Forms/TextForm.svelte';
	import NumberForm from './Forms/NumberForm.svelte';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { z } from 'zod';
	import { getQuestionType, type Question, type QuestionType } from '@app/ts-types';
	import { alert } from '$src/routes/alertStore';
	import Alert from '$lib/components/Alert/Alert.svelte';

	const dispatch = createEventDispatcher<{
		save: Question<QuestionType>;
	}>();

	let hidden = true;
	let carousel: CarouselFunctions | undefined;

	let question: Question<'number'> = {
		answer: 0,
		question: 'my question',
		type: 'number',
		pickingAnswers: undefined
	};

	const categories: { title: string; key: QuestionType }[] = [
		{ title: 'radio', key: 'radio' },
		{ title: 'text', key: 'text' },
		{ title: 'number', key: 'number' }
	];

	let carouselIndex = categories.findIndex((item) => item.key === question.type);

	type Key = (typeof categories)[number]['key'];

	let chosenCategory: Key = question.type; // ?? categories[0].key;

	$: chosenCategory = categories[carouselIndex].key;

	const changeFormTypeByPicker = (key: Key) => {
		if (!carousel) throw new Error('carousel has not been loaded yet');

		const index = categories.findIndex((item) => item.key === key);

		carousel.goTo(index);
	};

	$: if (carousel) changeFormTypeByPicker(chosenCategory); // this call is because i want to change it when it loads => it means it will change with current data and the type will be correct in carousel

	let error: string | null = null;

	const save = () => {
		try {
			if (!question) throw new Error('Question does not exist');
			const [type, checkedQuestion] = getQuestionType(question);

			dispatch('save', checkedQuestion);
			hidden = true;
		} catch (err) {
			error = 'there is no question';
		}
	};

	let pickingAnswersHelper: string[] = question.pickingAnswers ?? ['', ''];
	let stringAnswer = typeof question.answer === 'string' ? question.answer : '';
	let numberAnswer = typeof question.answer === 'number' ? question.answer : 0;
</script>

<AddQuestionButton {question} on:click={() => (hidden = false)} />

{#if !hidden}
	<Drawer
		bind:hidden
		placement="auto"
		size={400}
		class="z-50 fixed top-0 right-0 w-[500px] mobile:w-full mobile:h-[calc(100% - 20px)] top-[20px]"
	>
		{#if error}
			<Alert on:close={() => (error = null)} class="w-full relative" dismissable color="red"
				>{error}</Alert
			>
		{/if}
		<MediaQuery size="mobile">
			<Right>
				<Icon on:click={() => (hidden = true)} class="child:h-10 child:w-10">
					<IconTimes />
				</Icon>
			</Right>
		</MediaQuery>

		<Column>
			<Title>Your question</Title>

			<Input bind:value={question.question} floatingLabel="your question" class="w-full" />

			<CategoryPicker bind:chosenCategory {categories} />

			<Carousel bind:index={carouselIndex} bind:carousel swiping>
				<RadioForm
					class="min-h-[200px] p-4"
					answers={pickingAnswersHelper}
					bind:chosenAnswer={stringAnswer}
				/>
				<TextForm class="min-h-[200px] p-4" bind:answer={stringAnswer} />
				<NumberForm class="min-h-[200px] p-4" bind:answer={numberAnswer} />
			</Carousel>
		</Column>

		<Right>
			<Button on:click={save} color="green">save</Button>
		</Right>
	</Drawer>
{/if}
