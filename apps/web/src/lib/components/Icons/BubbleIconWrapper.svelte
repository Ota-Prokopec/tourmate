<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Common/Icon.svelte';
	export let disabled = false;

	let className = '';
	export { className as class };
</script>

<Icon
	{disabled}
	on:click
	class={twMerge(
		'bg-blue-500 w-16 h-16 rounded-full child:w-[50%] child:h-[50%] flex justify-center items-center child:fill-white',
		disabled && 'bg-gray-400',
		className
	)}
>
	<slot class="w-8 h-8 fill-white" />
</Icon>
