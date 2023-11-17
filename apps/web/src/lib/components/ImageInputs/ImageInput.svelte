<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, ButtonGroup, Dropzone } from 'flowbite-svelte';
	import { clipboard, elementIdGenerator, fileToBase64 } from '@app/utils';
	import type { Base64 } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import MyAlert from '../Alert/Alert.svelte';
	import Popover from '../Common/Popover.svelte';

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
		const base64 = await fileToBase64(file);
		dispatch('image', { name: file.name, base64: base64, file: file });
		if (autoImagesrcCompleter) imageURL = base64;
	};

	let className = '';
	export { className as class };

	const id = elementIdGenerator();

	const clipBoardRead = async () => {
		const file = await clipboard.readImage();

		if (!file)
			err({
				message: 'No file is supported',
				code: 404
			});
		else change(file);
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
</script>

{#if screenErrors && error}
	<MyAlert class="absolute ml-auto mr-auto top-0" color="red">
		<span slot="title">Error: Nahrání fotografie</span>
		{error.code === 404 ? 'Ve schránce nemáte žádnou fotografii, která by se uložila' : ''}
		<span slot="buttons">
			<Button
				on:click={() => {
					error = null;
				}}
				color="red">ok</Button
			>
		</span>
	</MyAlert>
{/if}

<Dropzone
	on:focus={() => (usePopup = true)}
	on:mouseover={() => (usePopup = true)}
	class={twMerge('object-cover ', className)}
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
	<Popover class={`z-[9999] w-auto`} color="light">
		<ButtonGroup>
			<Button on:click={openGallery} class="bg-red-500">přes galerii</Button>
			<Button on:click={clipBoardRead} class="bg-red-500">přes schránku</Button>
		</ButtonGroup>
	</Popover>
{/if}
