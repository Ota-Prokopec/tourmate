<script lang="ts">
	import type { Topic } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { topics } from './topics';
	import ChooseFromIcons from '$lib/components/ChooseFromIcons/ChooseFromIcons.svelte';
	const dispatch = createEventDispatcher<{ choose: Topic[] }>();

	export let chosenTopics: Topic[] = [];

	$: dispatch('choose', chosenTopics);

	let className = '';
	export { className as class };
</script>

<ChooseFromIcons on:change={(e) => (chosenTopics = e.detail)} class={className} data={topics} />
