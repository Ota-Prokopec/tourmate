<script lang="ts">
	import { Hr } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	type CategoryKey = $$Generic;

	type Category = {
		title: string;
		key: CategoryKey;
	};

	const dispatch = createEventDispatcher<{ change: CategoryKey }>();

	let className = '';
	export { className as class };

	export let categories: ReadonlyArray<Category>;
	export let chosenCategory = categories[0].key;
	$: dispatch('change', chosenCategory);
</script>

<div class={'w-auto h-min flex flex-wrap flex-row gap-4 justify-center ' + className}>
	{#each categories as { key, title }}
		<button
			on:click={() => {
				chosenCategory = key;
			}}
			class={`!w-auto pr-4 pl-4 !h-min text-lg  !rounded-none flex flex-wrap flex-col gap-1 ${
				chosenCategory === key ? 'text-black' : 'text-gray-400'
			}`}
			>{title}
			{#if chosenCategory === key}
				<span class="w-[120%] relative left-[-10%] h-[6px] bg-gray-300 rounded-full" />
			{/if}
		</button>
	{/each}
</div>
