<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import IconUpload from '../Icons/IconUpload.svelte';
	import ImageInput from './ImageInput.svelte';
	import Avatar from '../Common/Avatar.svelte';

	export let imageURL: URL | Base64 | null | undefined = undefined;
	export let autoImagesrcCompleter = true;
	export let disabled: boolean = false;
	export let method: 'gallery' | 'copyPaste' | 'both' = 'gallery';
	export let screenErrors: boolean = false;

	const onImage = (e: CustomEvent<{ name: string; file: File; base64: Base64 }>) => {
		imageURL = e.detail.base64;
	};

	let className = '';
	export { className as class };
</script>

<ImageInput
	class={className}
	{autoImagesrcCompleter}
	{disabled}
	{method}
	{screenErrors}
	on:image
	on:image={onImage}
>
	{#if !imageURL}
		<IconUpload />
		<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
			<span class="font-semibold">Click to upload</span> or drag and drop
		</p>
		<p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
	{:else}
		<Avatar class="w-full h-full rounded-none" src={imageURL} />
	{/if}
</ImageInput>
