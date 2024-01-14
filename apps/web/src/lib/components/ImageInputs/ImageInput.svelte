<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, ButtonGroup, Dropzone } from 'flowbite-svelte';
	import { clipboard, elementIdGenerator, fileToBase64 } from '@app/utils';
	import type { Base64 } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import MyAlert from '../Alert/Alert.svelte';
	import Popover from '../Common/Popover.svelte';
	import { alert } from '$src/routes/alertStore';
	import LL from '$src/i18n/i18n-svelte';
	import imageCompression from 'browser-image-compression';
	import { PUBLIC_MAX_IMAGE_SIZE_IN_MB } from '$env/static/public';

	//	import clipboard from '$lib/utils/clipboard'
	const dispatch = createEventDispatcher<{
		image: { name: string; file: File; base64: Base64 };
		error: {
			message: string;
			code: number;
		};
	}>();

	export let imageURL: URL | Base64 | null | undefined = undefined;
	export let autoImagesrcCompleter = true;
	export let disabled: boolean = false;
	export let method: 'gallery' | 'copyPaste' | 'both' = 'gallery';
	export let screenErrors: boolean = false;

	let usePopup: boolean = method === 'copyPaste' || method === 'both' ? true : false;

	const change = async (file: File) => {
		const compressedFile = await imageCompression(file, {
			maxSizeMB: parseFloat(PUBLIC_MAX_IMAGE_SIZE_IN_MB)
		});
		const base64 = await fileToBase64(compressedFile);

		dispatch('image', { name: file.name, base64: base64, file: file });
		if (autoImagesrcCompleter) imageURL = base64;
	};

	let className = '';
	export { className as class };

	const id = elementIdGenerator();

	const clipBoardRead = async () => {
		try {
			const file = await clipboard.readImage();

			if (!file)
				err({
					message: 'No file is supported',
					code: 404
				});
			else change(file);
		} catch (error) {
			clipboardError();
		}
	};

	const dropHandle = async (event: any) => {
		event.preventDefault();
		const files = event.dataTransfer.files;
		if (files.length > 0) change(files[0]);
	};

	const handleChange = async (event: any) => {
		const files = event.target.files;
		if (files.length > 0) change(files[0]);
	};

	const openGallery = () => {
		usePopup = false;
		setTimeout(() => {
			//to make it asynchronous
			document.getElementById(id)?.click();
		}, 0);
	};

	const err = ({ message, code }: { message: string; code: number }) => {
		dispatch('error', {
			message,
			code
		});
		error = { message, code };
	};

	let error: { code: number; message: string } | null = null;

	const clipboardError = () => {
		if (screenErrors) {
			alert('', $LL.component.ImageInput.clipboardNotFound(), { color: 'red' });
		}
	};
</script>

<Dropzone
	on:focus={() => (usePopup = true)}
	on:mouseover={() => (usePopup = true)}
	class={twMerge('object-cover min-w-none ', className)}
	{id}
	accept="image/*"
	on:drop={dropHandle}
	on:dragover={(event) => {
		event.preventDefault();
	}}
	on:change={handleChange}
	{disabled}
>
	<slot />
</Dropzone>

{#if usePopup}
	<Popover class={twMerge(`z-[9999] w-auto`, !usePopup && 'hidden')} color="light">
		<ButtonGroup>
			<Button on:click={openGallery} class="bg-red-500"
				>{$LL.component.ImageInput.throughGallery()}</Button
			>
			<Button on:click={clipBoardRead} class="bg-red-500"
				>{$LL.component.ImageInput.throughClipboard()}</Button
			>
		</ButtonGroup>
	</Popover>
{/if}
