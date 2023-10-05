<script lang="ts">
	import { elementIdGenerator } from '@app/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import Popover from './Popover.svelte';

	const dispatch = createEventDispatcher();
	export let value = '';
	export let placeholder = '';
	export let floatingLabel = '';
	export let id = elementIdGenerator();
	export let readOnly = false;
	export let maxLength = Infinity;
	export let icon: string | null | boolean | undefined = null;
	export let changedIconOnActive = icon;
	export let iconPosition: 'right' | 'left' = 'left';
	export let disabled = false;
	export let autocomplete = '';
	export let pattern: RegExp | null = null;
	export let prefix: string = '';
	export let invisiblePrefix = icon ? true : false;
	export let ableClickIcon = true;

	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'reset'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'search'
		| 'textarea' = 'text';

	let className: string = '';
	export { className as class };
	export let classWrap = '';

	$: inputValue = /*pattern ? value.replace(pattern, '') :*/ value; //this is here because we always want to equal input.value = value

	$: prefixControl(inputValue); //when inputValue changes => it will check prefix (so when we do $: inputValue = value this func will trigger every moment when inputValue will change and it will overwhite currect input.value thats will be {value})
	$: patternControl(inputValue); //when inputValue changes => it will check prefix (so when we do $: inputValue = value this func will trigger every moment when inputValue will change and it will overwhite currect input.value thats will be {value})

	const prefixControl = (_e: unknown) => {
		if (prefix) {
			if (!invisiblePrefix) {
				if (inputValue?.indexOf(prefix) !== 0) inputValue = `${prefix}${inputValue}`;
				value = inputValue;
			} else if (inputValue?.indexOf(prefix) !== 0) {
				value = `${prefix}${inputValue}`;
				//inputValue = value.slice(prefix.length, value.length)
			} else value = inputValue;
		} else {
			value = inputValue;
		}
	};

	const patternControl = (_e: unknown) => {
		inputValue = pattern ? inputValue.replace(pattern, '') : inputValue;
	};

	let inputElement: HTMLElement | null = null;

	onMount(() => {
		prefixControl('');
		patternControl('');
		inputElement = document.getElementById(id);
	});

	let iconClicked = false;
	let iconPushedCount = 0;

	const iconClick = () => {
		iconPushedCount++;
		iconClicked = iconPushedCount % 2 === 1;
		dispatch('iconClick');
	};
	const retype = (e: HTMLElement) => {
		e.setAttribute('type', type);
	};
</script>

<button class={twMerge('relative w-min ', className, classWrap)}>
	{#if icon}
		<button
			class={`absolute inset-y-0 ${
				iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
			} flex items-center  pointer-events-none ${
				!ableClickIcon ? 'pointer-events-none' : 'pointer-events-auto z-50'
			} z-50 `}
			on:click={iconClick}
		>
			{#if typeof icon === 'string'}
				{#if iconClicked}
					{changedIconOnActive}
				{:else}
					{icon}
				{/if}
			{:else}
				<slot {iconClicked} />
			{/if}
		</button>
	{/if}

	<input
		{disabled}
		use:retype
		{id}
		class={twMerge(
			'rounded-3xl !m-0: p-4 text-gray-900 border border-gray-300 text-left outline-none appearance-none w-full',
			icon && (iconPosition === 'left' ? 'pl-12' : 'pr-12'),
			readOnly && 'cursor-pointer',
			floatingLabel &&
				'w-full text-gray-900 bg-transparent border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
			className
		)}
		{placeholder}
		bind:value={inputValue}
		on:input
		readonly={readOnly ? true : null}
		maxlength={maxLength}
		{...$$restProps}
		{autocomplete}
	/>

	{#if floatingLabel}
		<label
			for={id}
			class="absolute ml-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
			>{floatingLabel}</label
		>
	{/if}
</button>
{#if disabled}
	<Popover color="red">you are not allowed to edit your {placeholder || floatingLabel}</Popover>
{/if}

<style>
	.input::placeholder {
		color: #8f8f8f;
		font-style: normal;
		line-height: 28px;
	}
</style>
