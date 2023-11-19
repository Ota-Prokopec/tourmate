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
	const dispatch = createEventDispatcher<{
		save: {
			type: Key;
			answer: string | number;
			pickingAnswers: string[] | undefined;
		};
	}>();

	let hidden = false;
	let carousel: CarouselFunctions;

	let pickingAnswers: string[] = ['', ''];
	let chosenStringAnswer: string = '';
	let chosenNumberAnswer: number = 0;

	const categories = [
		{ title: 'radio', key: 'radio' },
		{ title: 'text', key: 'text' },
		{ title: 'number', key: 'number' }
	] as const;

	type Key = (typeof categories)[number]['key'];

	let chosenCategory: Key = categories[0].key;

	const changeFormTypeByCarousel = (index: number) => {
		chosenCategory = categories[index].key;
	};
	const changeFormTypeByPicker = (key: Key) => {
		chosenCategory = key;
		const index = categories.findIndex((item) => item.key === key);
		carousel.goTo(index);
	};

	const answerZodSchema = z.union([z.string().nonempty(), z.number()]);
	const pickingAnswersZodSchema = z.string().array();

	const save = () => {
		dispatch('save', {
			answer: answerZodSchema.parse(
				chosenCategory === 'number' ? chosenNumberAnswer : chosenStringAnswer
			),
			pickingAnswers:
				chosenCategory === 'radio' ? pickingAnswersZodSchema.parse(pickingAnswers) : undefined,
			type: chosenCategory
		});
	};
</script>

<AddQuestionButton on:click={() => (hidden = false)} />
<Drawer
	bind:hidden
	placement="auto"
	size={400}
	class="z-50 fixed top-0 right-0 w-[500px] mobile:w-full mobile:h-[calc(100% - 20px)] top-[20px]"
>
	<MediaQuery size="mobile">
		<Right>
			<Icon on:click={() => (hidden = true)} class="child:h-10 child:w-10">
				<IconTimes />
			</Icon>
		</Right>
	</MediaQuery>

	<Column>
		<Title>Your question</Title>
		<Input floatingLabel="your question" class="w-full" />

		<CategoryPicker
			on:change={(e) => changeFormTypeByPicker(e.detail)}
			{chosenCategory}
			{categories}
		/>

		<Carousel bind:carousel on:change={(e) => changeFormTypeByCarousel(e.detail.index)} swiping>
			<RadioForm
				class="min-h-[200px] p-4"
				answers={pickingAnswers}
				bind:chosenAnswer={chosenStringAnswer}
			/>
			<TextForm class="min-h-[200px] p-4" bind:answer={chosenStringAnswer} />
			<NumberForm class="min-h-[200px] p-4" bind:answer={chosenNumberAnswer} />
		</Carousel>
	</Column>

	<Right>
		<Button on:click={save} color="green">save</Button>
	</Right>
</Drawer>
