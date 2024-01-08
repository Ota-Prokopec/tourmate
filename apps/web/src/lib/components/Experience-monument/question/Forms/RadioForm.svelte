<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Counter from '$lib/components/Common/Counter.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { Input, Radio } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let answers: string[] = ['', ''];
	export let chosenAnswer: string = '';
	export let type: 'answering' | 'creating-question';

	//FIXME: this does not show that it is checked

	let className = '';
	export { className as class };
</script>

<Column class={twMerge('justify-center items-center', className)}>
	{#if type === 'creating-question'}
		<Counter
			on:reduce={() => {
				answers = answers.slice(0, answers.length - 1);
			}}
			on:increase={() => (answers = [...answers, ''])}
			min={2}
			max={4}
		>
			<Text>{answers.length}</Text>
		</Counter>
	{/if}

	{#each answers as answer}
		<Radio
			name="answers"
			color="green"
			class="text-black w-full"
			checked={chosenAnswer === answer}
			value={answer}
			bind:group={chosenAnswer}
		>
			{#if type === 'creating-question'}
				<Input class="w-full" bind:value={answer} />
			{:else}
				<Text class="w-full">{answer}</Text>
			{/if}
		</Radio>
	{/each}
</Column>
