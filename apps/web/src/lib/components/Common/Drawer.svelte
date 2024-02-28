<script lang="ts">
	import { device } from '@app/utils';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { twMerge } from 'tailwind-merge';
	import Eval from './Eval.svelte';
	import Icon from './Icon.svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import Right from './Right.svelte';

	export let placement: 'right' | 'left' | 'top' | 'bottom' | 'auto';
	if (placement === 'auto') placement = device.recognizeWidth() === 'mobile' ? 'bottom' : 'right';
	export let hidden = true;
	export let activateClickOutside = true;
	export let backdrop = true;
	export let disableClosing = false;

	let className = '';
	export { className as class };

	const transitionParams = {
		x: placement === 'right' ? 0 : placement === 'left' ? -0 : undefined,
		y: placement === 'top' ? -0 : placement === 'bottom' ? 0 : undefined,
		duration: 200,
		easing: sineIn
	};
</script>

{#if placement !== 'auto'}
	<Drawer
		{backdrop}
		{activateClickOutside}
		bind:hidden
		class={twMerge('rounded-xl relative z-50', className)}
		{placement}
		{transitionParams}
		transitionType="fly"
	>
		{#if !disableClosing}
			<Right class="h-auto w-full">
				<Icon on:click={() => (hidden = true)} class="child:h-10 child:w-10">
					<IconTimes />
				</Icon>
			</Right>
		{/if}

		<slot />
	</Drawer>
{:else}
	<Eval evaluate={new Error('Placement is auto')} />
{/if}
