<script lang="ts">
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { twMerge } from 'tailwind-merge';
	export let placement: 'right' | 'left' | 'top' | 'bottom';
	export let width: number;
	export let hidden = true;

	let className = '';
	export { className as class };

	const transitionParams = {
		x: placement === 'right' ? width : placement === 'left' ? -width : undefined,
		y: placement === 'top' ? width : placement === 'bottom' ? -width : undefined,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer
	bind:hidden
	class={twMerge('rounded-xl z-50', className)}
	{placement}
	transitionType="fly"
	{transitionParams}><slot /></Drawer
>
