<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Popover from './Popover.svelte';
	import { Avatar, Button, ButtonGroup, Dropzone } from 'flowbite-svelte';
	import MyAlert from './MyAlert.svelte';
	import { Button as FlowbiteButton } from 'flowbite-svelte';
	import { clipboard, elementIdGenerator, fileToBase64 } from '@app/utils';
	import IconUpload from '../Icons/IconUpload.svelte';
	import type { Base64 } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';

	//	import clipboard from '$lib/utils/clipboard'
	const dispatch = createEventDispatcher<{
		image: { name: string; file: File; base64: string | ArrayBuffer | null };
		error: {
			message: string;
			code: number;
		};
	}>();

	export let imageSrc: string | Base64 | null | undefined = null;
	export let autoImagesrcCompleter = true;
	export let disabled: boolean = false;
	export let method: 'gallery' | 'copyPaste' | 'both' = 'gallery';
	let usePopup: boolean = method === 'copyPaste' || method === 'both' ? true : false;
	export let screenErrors: boolean = false;
	export let style: 'avatar' | 'basic' = 'basic';

	const change = async (file: File) => {
		const base64 = await fileToBase64(file);
		dispatch('image', { name: file.name, base64: base64, file: file });
		if (autoImagesrcCompleter) imageSrc = base64;
	};

	let className = '';
	export { className as class };
	export let popoverClass = '';

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
			<FlowbiteButton
				on:click={() => {
					error = null;
				}}
				color="red">ok</FlowbiteButton
			>
		</span>
	</MyAlert>
{/if}

<Dropzone
	on:focus={() => (usePopup = true)}
	on:mouseover={() => (usePopup = true)}
	class={twMerge('object-cover', className)}
	{id}
	on:drop={dropHandle}
	on:dragover={(event) => {
		event.preventDefault();
	}}
	on:change={handleChange}
	{disabled}
>
	{#if style === 'basic'}
		<div
			class="w-full h-full z-50 flex justify-center items-center flex-wrap flex-col bg-no-repeat bg-center bg-cover"
			style="background-image: url({imageSrc})"
		>
			<IconUpload />
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">
				SVG, PNG, JPG or GIF (MAX. 800x400px)
			</p>
		</div>
	{:else}
		<Avatar class="w-full h-full object-cover absolute top-0" src={imageSrc ?? undefined} />
	{/if}
</Dropzone>

{#if usePopup}
	<Popover class={`z-[9999]`} color="light">
		<ButtonGroup>
			<Button on:click={openGallery} class="bg-red-500">přes galerii</Button>
			<Button on:click={clipBoardRead} class="bg-red-500">přes schránku</Button>
		</ButtonGroup>
	</Popover>
{/if}

<style>
</style>
