<script lang="ts">
	import Text from './Text.svelte';

	import Column from './Column.svelte';

	import Row from './Row.svelte';

	import { twMerge } from 'tailwind-merge';

	type ID = $$Generic<string>;
	type Title = $$Generic<string>;

	export let items: Array<{
		title: Title;
		id: ID;
		remove?: boolean;
	}>;

	let className = '';
	export { className as class };
	export let textClasses = '';
</script>

<Column>
	{#each items as { title, id, remove }}
		{#if !remove}
			<Column class={twMerge('gap-1', className)}>
				<Text class={twMerge('text-xl text-left', textClasses)}>{title}</Text>
				<slot {id} />
			</Column>
		{/if}
	{/each}
</Column>
