<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import IconUpload from '../Icons/IconUpload.svelte';
	import ImageInput from './ImageInput.svelte';
	import Avatar from '../Common/Avatar.svelte';
	import { twMerge } from 'tailwind-merge';
	import LL from '$src/i18n/i18n-svelte';
	import Loading from '../Common/Loading.svelte';

	export let imageURL: URL | Base64 | null | undefined | string = undefined;
	export let autoImagesrcCompleter = true;
	export let disabled: boolean = false;
	export let method: 'gallery' | 'copyPaste' | 'both' = 'gallery';
	export let screenErrors: boolean = false;
	export let isLoading: boolean = false;

	const onImage = (e: CustomEvent<{ name: string; file: File; base64: Base64 }>) => {
		imageURL = e.detail.base64;
	};

	let className = '';
	export { className as class };
</script>

<ImageInput
	class={twMerge('h-auto w-auto', className)}
	{autoImagesrcCompleter}
	{disabled}
	{method}
	{screenErrors}
	bind:isLoading
	on:image
	on:image={onImage}
>
	{#if isLoading}
		<Loading type="circle3" />
	{:else if !imageURL}
		<IconUpload />
		<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
			<span class="font-semibold">{$LL.component.BasicImageInput.title()}</span>
		</p>
		<p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
	{:else}
		<Avatar class="w-full h-full rounded-none" src={imageURL} />
	{/if}
</ImageInput>
