<script lang="ts">
	import { Card, Img } from 'flowbite-svelte';
	import { myNewExperienceStore } from './newExperienceStore';
	import Button from '$lib/components/Common/Button.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { trpc } from '$lib/trpc.js';
	import { page } from '$app/stores';
	import Loading from '$lib/components/Common/Loading.svelte';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { elementIdGenerator, fileToBase64 } from '@app/utils';

	import '@pqina/pintura/pintura.css';
	import {
		type PinturaEditorDefaultOptions,
		getEditorDefaults,
		type ProgressCallback
	} from '@pqina/pintura';
	import PinturaEditor from '@pqina/svelte-pintura/PinturaEditor.svelte';
	import type { Base64, Location } from '@app/ts-types';

	export let data;

	const { imgSrc, location } = $myNewExperienceStore;
	const id = elementIdGenerator();

	let state: 'loading' | 'success' | 'failure' | null = null;

	$: if (state === 'success') {
		//setTimeout(() => goto('/'), 1500);
	}

	const publicExp = async (base64: Base64, location: Location) => {
		try {
			state = 'loading';
			const res = await trpc($page).experience.create.mutate({ location, imgSrc: base64 });
			//state = 'success';
			$myNewExperienceStore.rightNowAddedExperience = res;
			goto('/');
		} catch (error) {
			state = 'failure';
		}
	};

	const editorConfig: PinturaEditorDefaultOptions = {};

	const exportBase64FromPintura = () => {
		const pinturaExportButton = document.getElementsByClassName(
			'PinturaButtonExport'
		)[0] as HTMLButtonElement;
		pinturaExportButton.click();
	};

	const handleEditorProcess = async (e: CustomEvent<{ dest: File }>) => {
		const base64 = (await fileToBase64(e.detail.dest)) as Base64;
		console.log(base64);

		publicExp(base64, $myNewExperienceStore.location);
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if state === null}
		{#if state === 'failure'}
			<MyAlert color="red">Error</MyAlert>
		{/if}
		<div class="w-full h-[88dvh] absolute top-0">
			<PinturaEditor
				on:process={handleEditorProcess}
				{...getEditorDefaults(editorConfig)}
				src={imgSrc}
			/>
		</div>
		<div class="w-full h-auto p-5 absolute bottom-0 justify-end flex">
			<Button
				on:click={exportBase64FromPintura}
				class="bg-blue-400 flex gap-4 rounded-full w-auto"
			>
				{#if state === 'loading'}
					<Loading />
				{:else}
					Zveřejnit
				{/if}

				<IconNext class="w-10" /></Button
			>
		</div>
	{/if}
</div>

<style>
	:global(.PinturaButtonExport) {
		display: none;
	}
</style>
