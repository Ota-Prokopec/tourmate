<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import IconMinus from '../Icons/IconMinus.svelte';
	import IconPlus from '../Icons/IconPlus.svelte';
	import Center from './Center.svelte';
	import Columns from './Columns.svelte';
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ increase: number; reduce: number }>();

	let className = '';
	export { className as class };
	export let max: number;
	export let min: number;
	export let value = min ? min : 0;
</script>

<Columns
	columns="1fr min-content 1fr"
	class={twMerge('rounded-full w-min h-min border border-black gap-2', className)}
>
	<Icon
		class="child:w-12 child:h-12"
		on:click={() => {
			if (value !== min) {
				value--;
				dispatch('reduce', value);
			}
		}}
	>
		<IconMinus />
	</Icon>
	<Center class="w-auto h-full">
		<slot />
	</Center>
	<Icon
		class="child:w-12 child:h-12"
		on:click={() => {
			if (value !== max) {
				value++;
				dispatch('increase', value);
			}
		}}
	>
		<IconPlus />
	</Icon>
</Columns>
