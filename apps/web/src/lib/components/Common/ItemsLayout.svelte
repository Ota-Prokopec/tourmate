<script lang="ts" generics="T extends string">
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

<Row class={twMerge('gap-4', className)}>
	{#each items as { title, id, remove }}
		{#if !remove}
			<Row class="gap-1">
				<span class="text-xl">{title}</span>
				<span class={itemsClass}><slot {id} /></span>
			</Row>
		{/if}
	{/each}
</Row>
