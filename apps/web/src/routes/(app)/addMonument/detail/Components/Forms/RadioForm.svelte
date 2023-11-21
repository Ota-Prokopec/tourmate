<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Counter from '$lib/components/Common/Counter.svelte';
	import { Input, Radio } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let answers: string[] = ['', ''];
	export let chosenAnswer: string = '';

	//FIXME: this does not show that it is checked

	export let disableCounter = false;

	let className = '';
	export { className as class };
</script>

<Column class={twMerge('justify-center items-center', className)}>
	{#if !disableCounter}
		<Counter
			on:reduce={() => {
				answers = answers.slice(0, answers.length - 1);
			}}
			on:increase={() => (answers = [...answers, ''])}
			min={2}
			max={4}>{answers.length}</Counter
		>
	{/if}

	{#each answers as answer}
		<Radio
			name="answers"
			color="green"
			class="text-black w-full"
			value={answer}
			bind:group={chosenAnswer}
		>
			<Input class="w-full" bind:value={answer} />
		</Radio>
	{/each}
</Column>
