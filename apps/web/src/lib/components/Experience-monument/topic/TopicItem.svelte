<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import { twMerge } from 'tailwind-merge';
	import { topics } from './topics';

	export let topicKey: (typeof topics)[number]['key'];
	export let chosen = false;

	const topic = topics.filter((t) => t.key === topicKey)[0];

	let className = '';
	export { className as class };
</script>

<Icon
	on:click
	class={twMerge(
		'border border-gray-900 rounded-full p-2 w-8 h-8',
		chosen && 'fill-blue-300 border-blue-300',
		className
	)}
>
	<svelte:component this={topic.icon} />
</Icon>
