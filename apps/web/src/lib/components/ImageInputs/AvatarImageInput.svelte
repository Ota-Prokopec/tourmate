<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import IconUpload from '../Icons/IconUpload.svelte';
	import ImageInput from './ImageInput.svelte';
	import { Img } from 'flowbite-svelte';
	import Avatar from '../Common/Avatar.svelte';

	export let imageURL: URL | Base64 | null | undefined | string = undefined;
	export let autoImagesrcCompleter = true;
	export let disabled: boolean = false;
	export let method: 'gallery' | 'copyPaste' | 'both' = 'gallery';
	export let screenErrors: boolean = false;

	let className = '';
	export { className as class };
	export let avatarClassName = '';

	$: imgUrlAsString = imageURL as string;
</script>

<ImageInput class={className} {autoImagesrcCompleter} {disabled} {method} {screenErrors} on:image>
	<Avatar size="xl" class={avatarClassName} src={imgUrlAsString} />
</ImageInput>
