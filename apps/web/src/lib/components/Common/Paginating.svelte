<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	import NoContent from './NoContent.svelte';

	import LoadMoreButton from '../Buttons/LoadMoreButton.svelte';
	import Loading from './Loading.svelte';
	import Column from './Column.svelte';
	import { createEventDispatcher } from 'svelte';

	type ListItem = $$Generic;
	type List = ListItem[];

	const dispatch = createEventDispatcher<{ loadMore: { currentList: List } }>();

	export let list: List;

	export let initialLoading = false;
	export let loadingMoreItems = false;

	const loadMore = () => {
		dispatch('loadMore', { currentList: list });
	};

	export let wrapperClassName = '';
</script>

<Column class={twMerge('items-center w-full', wrapperClassName)}>
	{#if initialLoading}
		<slot name="loading" />
	{:else if list.length > 0}
		{#each list as item}
			<slot {item} />
		{/each}
		{#if loadingMoreItems}
			<Loading />
		{:else}
			<LoadMoreButton on:click={loadMore} />
		{/if}
	{:else}
		<NoContent class="w-full" />
		<slot name="noContent" />
	{/if}
</Column>
