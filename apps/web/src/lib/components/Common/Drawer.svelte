<script lang="ts">
	import { device } from '@app/utils';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { twMerge } from 'tailwind-merge';
	import Eval from './Eval.svelte';
	import ClickOutside from './ClickOutside.svelte';
	export let placement: 'right' | 'left' | 'top' | 'bottom' | 'auto';
	if (placement === 'auto') placement = device.recognizeWidth() === 'mobile' ? 'bottom' : 'right';
	export let size: number;
	export let hidden = true;

	let className = '';
	export { className as class };

	const transitionParams = {
		x: placement === 'right' ? size : placement === 'left' ? -size : undefined,
		y: placement === 'top' ? -size : placement === 'bottom' ? size : undefined,
		duration: 200,
		easing: sineIn
	};
</script>

{#if placement !== 'auto'}
	<Drawer
		bind:hidden
		class={twMerge('rounded-xl relative z-50', className)}
		{placement}
		{transitionParams}
		transitionType="fly"
	>
		<slot />
	</Drawer>
{:else}
	<Eval evaluate={new Error('Placement is auto')} />
{/if}
