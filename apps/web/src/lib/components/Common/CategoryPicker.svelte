<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	import { Hr } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import Text from './Text.svelte';
	type CategoryKey = $$Generic;

	type Category = {
		title: string;
		key: CategoryKey;
	};

	const dispatch = createEventDispatcher<{ change: CategoryKey }>();

	export let categories: ReadonlyArray<Category>;
	export let chosenCategory: CategoryKey = categories[0].key;
	$: dispatch('change', chosenCategory);

	export let lineClassName = '';
	let className = '';
	export { className as class };
</script>

<div class={'w-auto h-min flex flex-wrap flex-row gap-4 justify-center ' + className}>
	{#each categories as { key, title }}
		<button
			on:click={() => {
				chosenCategory = key;
			}}
			class={`!w-auto pr-4 pl-4 !h-min text-lg  !rounded-none flex flex-wrap flex-col gap-1`}
		>
			<Text class={chosenCategory === key ? '' : '!text-gray-400'}>
				<slot {key} {title} />
			</Text>
			{#if chosenCategory === key}
				<span
					class={twMerge(
						'w-[120%] relative left-[-10%] h-[6px] bg-gray-300 rounded-full',
						lineClassName
					)}
				/>
			{/if}
		</button>
	{/each}
</div>
