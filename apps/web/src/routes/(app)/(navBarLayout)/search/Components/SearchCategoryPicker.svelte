<script lang="ts">
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconCity from '$lib/components/Icons/IconCity.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import IconUserCircle from '$lib/components/Icons/IconUserCircle.svelte';
	import type { TSearchCategory } from '../types';

	export let category: TSearchCategory = 'monuments';

	const categories: { title: ''; key: TSearchCategory }[] = [
		{ title: '', key: 'users' },
		{ title: '', key: 'monuments' },
		{ title: '', key: 'places' }
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
		{#if key === 'users'}
			<IconUserCircle />
		{:else if key === 'monuments'}
			<IconLocation />
		{:else if key === 'places'}
			<IconCity />
		{/if}
	</Icon>
</CategoryPicker>
