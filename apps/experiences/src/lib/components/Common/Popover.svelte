<script lang="ts">
	import { device } from '@app/utils';
	import { Popover } from 'flowbite-svelte';

	export let placement: 'bottom' | 'left' | 'right' | 'top' = 'bottom';
	export let trigger: 'hover' | 'click' =
		device.recognizeWidth() === 'mobile' ? 'click' : 'hover';
	export let title: string = '';
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

<Popover {title} class={className} {color} {trigger} {placement}>
	<slot />
</Popover>
