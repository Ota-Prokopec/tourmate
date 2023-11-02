<script lang="ts" generics="T extends string">
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

<div
	class={twMerge(
		`h-auto  flex flex-wrap flex-col gap-4 border-gray-500  rounded-xl w-full`,
		className
	)}
>
	{#each items as { title, id, remove }}
		{#if !remove}
			<div class="flex flex-wrap flex-col gap-1">
				<span class="text-2xl">{title}</span>
				<span class={itemsClass}><slot {id} /></span>
			</div>
		{/if}
	{/each}
</div>
