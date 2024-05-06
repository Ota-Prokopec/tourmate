<script lang="ts">
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconImages from '$lib/components/Icons/IconImages.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import IconRoute from '$lib/components/Icons/IconRoute.svelte';
	import type { TAccountCategory } from './AccountCategoryPicker';

	export let category: TAccountCategory = 'monuments';

	const categories: { title: ''; key: TAccountCategory }[] = [
		{ title: '', key: 'monuments' },
		{ title: '', key: 'tours' }
	] as const;
</script>

<CategoryPicker
	lineClassName="w-[200%] left-[-50%]"
	let:key
	let:title
	{categories}
	bind:chosenCategory={category}
>
	<Icon class="child:!fill-white child:w-8 child:h-8">
		{#if key === 'monuments'}
			<IconLocation />
		{:else if key === 'tours'}
			<IconRoute />
		{/if}
	</Icon>
</CategoryPicker>
