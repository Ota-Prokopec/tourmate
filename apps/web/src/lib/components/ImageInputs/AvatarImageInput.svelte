<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import IconUpload from '../Icons/IconUpload.svelte';
	import ImageInput from './ImageInput.svelte';
	import Avatar from '../Common/Avatar.svelte';
	import Loading from '../Common/Loading.svelte';

	export let imageURL: URL | Base64 | null | undefined | string = undefined;
	export let autoImagesrcCompleter = true;
	export let disabled: boolean = false;
	export let method: 'gallery' | 'copyPaste' | 'both' = 'gallery';
	export let screenErrors: boolean = false;
	export let isLoading = false;

	let className = '';
	export { className as class };
	export let avatarClassName = '';

	$: imgUrlAsString = imageURL as string;
</script>

<ImageInput
	maxImageSizeInMB={50 / 1000}
	class={className}
	{autoImagesrcCompleter}
	{disabled}
	{method}
	{screenErrors}
	bind:isLoading
	on:image
>
	{#if isLoading}
		<Loading type="circle3" />
	{:else}
		<Avatar size="xl" class={avatarClassName} src={imgUrlAsString} />
	{/if}
</ImageInput>
