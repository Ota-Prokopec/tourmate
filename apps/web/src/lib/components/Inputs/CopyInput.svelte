<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '../Common/Icon.svelte';
	import Input from '../Common/Input.svelte';
	import IconCopy from '../Icons/IconCopy.svelte';
	import { twMerge } from 'tailwind-merge';
	import { clipboard } from '@app/utils';
	const dispatch = createEventDispatcher<{ copy: string }>();

	export let value: string = '';
	export let placeholder = '';
	export let disableAutoClipboardCopy = false;

	let isCopied = false;
	$: if (isCopied) {
		setTimeout(() => {
			isCopied = false;
		}, 1500);
	}

	let className = '';
	export { className as class };

	const copy = async () => {
		if (!disableAutoClipboardCopy) console.warn('You are not able to copy text into the clipboard');
		await clipboard.copy(value);
		isCopied = true;
	};
</script>

<Input
	iconPosition="right"
	ableClickIcon
	icon
	classWrap={twMerge('w-full !rounded-3xl', className)}
	bind:value
	{placeholder}
>
	{#if isCopied}
		<Icon class="absolute right-0 m-4 text-green-400 animate-pulse" icon="fa fa-check" />
	{:else}
		<Icon on:click={copy} on:click={() => dispatch('copy', value)}>
			<IconCopy />
		</Icon>
	{/if}
</Input>
