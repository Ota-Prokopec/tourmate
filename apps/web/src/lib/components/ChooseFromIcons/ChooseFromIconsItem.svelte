<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Common/Icon.svelte';

	export let chosen: boolean = false;
	export let circuit = true;

	let className = '';
	export { className as class };
</script>

<Icon
	on:click
	class={twMerge(
		'border-gray-900 rounded-full w-8 h-8',
		chosen && 'fill-blue-300 border-blue-300',
		className,
		circuit && 'border'
	)}
>
	<slot />
</Icon>
