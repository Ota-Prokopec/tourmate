<script lang="ts" generics="T extends string">
	import Column from './Column.svelte';

	import Row from './Row.svelte';

	import { twMerge } from 'tailwind-merge';

	export let items: Array<{
		title: string;
		id: T;
		remove?: boolean;
	}>;

	let className = '';
	export { className as class };
	export let itemsClass = '';
</script>

<Row class={twMerge('gap-4 w-full', className)}>
	{#each items as { title, id, remove }}
		{#if !remove}
			<Column class="gap-1 w-full ">
				<span class="text-xl w-min">{title}</span>
				<span class={itemsClass}><slot {id} /></span>
			</Column>
		{/if}
	{/each}
</Row>
