<script lang="ts">
	import Row from '$lib/components/Common/Row.svelte';
	import type { Topic } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { topics } from './topics';
	import TopicItem from './TopicItem.svelte';
	const dispatch = createEventDispatcher<{ choose: Topic }>();

	export let chosenTopic: Topic | undefined = undefined;
	$: dispatch('choose', chosenTopic);

	let className = '';
	export { className as class };
</script>

<Row
	class={twMerge(
		'w-auto p-2 gap-2 justify-between h-auto border border-gray-800 rounded-full',
		chosenTopic && 'justify-center',
		className
	)}
>
	{#each topics as topic}
		{#if !chosenTopic || chosenTopic === topic.key}
			<TopicItem
				topicKey={topic.key}
				chosen={chosenTopic === topic.key}
				on:click={() => {
					if (chosenTopic === topic.key) chosenTopic = undefined;
					else chosenTopic = topic.key;
				}}
			/>
		{/if}
	{/each}
</Row>
