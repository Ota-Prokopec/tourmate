<script lang="ts">
	import { elementIdGenerator } from '@app/utils';
	import { Textarea } from 'flowbite-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	const dispatch = createEventDispatcher();
	export let value: string = '';
	export let maxLength: number = Infinity;
	export let placeholder: string = '';
	export let letterCount: boolean = false;
	export let disableResize: boolean = false;
	export let disableScroll: boolean = true;
	export let disabled: boolean = false;
	export let disableResizeOnLoad: boolean = false;
	export let disableEnterKey: boolean = false;
	export let minRows: number | null = null;

	let className = '';
	export { className as class };
	export let classWrap = '';

	const id = elementIdGenerator();

	if (!disableResizeOnLoad)
		onMount(() => {
			const el = document.getElementById(id);
			if (el) autoresize(el);
		});

	function autoresize(el: HTMLElement) {
		el.style.height = 'auto';
		el.style.height = el.scrollHeight + 'px';
		el.scrollTop = el.scrollHeight;
	}
</script>

<div class={twMerge('relative', classWrap)}>
	{#if letterCount}
		<span class="text-[11px] absolute right-0 top-[-14px] pr-1">{value.length}/{maxLength}</span
		>
	{/if}
	<Textarea
		{id}
		{disabled}
		rows={minRows}
		on:change
		on:input={() => dispatch('input', value)}
		on:keydown={(e) => {
			const el = document.getElementById(id);
			if (el) autoresize(el);
		}}
		on:keydown={(e) => {
			if (e.code == 'Enter' && disableEnterKey) e.preventDefault();
		}}
		{placeholder}
		class={twMerge(
			disableScroll && 'overflow-hidden',
			disableResize && 'resize-none',
			className
		)}
		maxlength={maxLength}
		bind:value
	/>
</div>
