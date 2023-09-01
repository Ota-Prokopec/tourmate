<script lang="ts">
	import { device } from '@app/utils';
	import { Popover } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let placement: 'bottom' | 'left' | 'right' | 'top' = 'bottom';
	export let trigger: 'hover' | 'click' =
		device.recognizeWidth() === 'mobile' ? 'click' : 'hover';
	export let title: string = '';
	export let open = false;
	export let color:
		| 'gray'
		| 'red'
		| 'yellow'
		| 'green'
		| 'indigo'
		| 'default'
		| 'purple'
		| 'pink'
		| 'blue'
		| 'light'
		| 'dark'
		| 'dropdown'
		| 'navbar'
		| 'navbarUl'
		| 'form'
		| 'none' = 'green';

	let className = '';
	export { className as class };
</script>

<Popover
	{open}
	{title}
	class={twMerge('break-words w-96 z-50', className)}
	{color}
	{trigger}
	{placement}
>
	<slot />
</Popover>
