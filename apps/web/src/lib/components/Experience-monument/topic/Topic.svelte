<script lang="ts">
	import Row from '$lib/components/Common/Row.svelte';
	import type { Topic } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { topics } from './topics';
	import TopicItem from './TopicItem.svelte';
	import { removeItemsFromArray } from '@app/utils';
	const dispatch = createEventDispatcher<{ choose: Topic[] }>();

	export let chosenTopics: Topic[] = [];

	$: dispatch('choose', chosenTopics);

	let className = '';
	export { className as class };
</script>

<Row
	class={twMerge(
		'w-auto p-2 gap-2 justify-between h-auto border border-gray-800 rounded-full',

		className
	)}
>
	{#each topics as topic}
		<TopicItem
			topicKey={topic.key}
			chosen={chosenTopics.includes(topic.key)}
			on:click={() => {
				if (chosenTopics.includes(topic.key))
					chosenTopics = removeItemsFromArray(chosenTopics, topic.key);
				else chosenTopics = [...chosenTopics, topic.key];
			}}
		/>
	{/each}
</Row>
