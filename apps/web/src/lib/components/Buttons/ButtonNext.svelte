<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Common/Icon.svelte';
	import IconNext from '../Icons/IconNext.svelte';
	export let disabled = false;

	let className = '';
	export { className as class };
</script>

<Icon
	{disabled}
	on:click
	class={twMerge('bg-blue-500 w-16 h-16 rounded-full', disabled && 'bg-gray-400', className)}
>
	<IconNext class="w-8 h-8 fill-white" />
</Icon>
