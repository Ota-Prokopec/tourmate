<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import ImageEditor from '../ImageEditor/ImageEditor.svelte';
	import type { EditorOptions } from '../ImageEditor/items/ImageEditorTypes';
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import IconNext from '../Icons/IconNext.svelte';
	import { Button } from 'flowbite-svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Text from './Text.svelte';
	import Right from './Right.svelte';
	const dispatch = createEventDispatcher<{ save: { base64: Base64 } }>();

	let result: string | Base64 = '';
	export let profilePicture: URL | string | Base64;
	export let isLoading = false;

	let editorOptions: EditorOptions = {
		cropping: {
			minCropBoxWidth: 160,
			minCropBoxHeight: 160,
			aspectRatio: 1,
			cropOnStart: {
				disableUserToDisableCropping: true
			}
		}
	};

	let disableSave = editorOptions.cropping?.cropOnStart?.disableUserToDisableCropping;

	const save = () => {
		dispatch('save', { base64: result as Base64 });
	};

	const change = (e: CustomEvent<{ url: string | Base64; width: number; height: number }>) => {
		if (e.detail.width === e.detail.height) {
			disableSave = false;
		}
	};
</script>

<ImageEditor
	on:change={change}
	options={editorOptions}
	class="w-full h-full"
	bind:result
	url={profilePicture}
>
	<span slot="bottom">
		<Right class="p-4">
			{#if !disableSave}
				<Button
					on:click={save}
					class="h-14 flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl pr-6 pl-6 rounded-full fill-white"
					color="blue"
				>
					{#if isLoading}
						<SyncLoader color="black" size={30} unit="px" />
					{:else}
						change picture <Icon><IconNext /></Icon>
					{/if}
				</Button>
			{:else}
				<Text class="">you have to crop your picture to 1:1 first</Text>
			{/if}
		</Right>
	</span>
</ImageEditor>
