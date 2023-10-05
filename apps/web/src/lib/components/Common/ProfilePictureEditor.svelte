<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import ImageEditor from '../ImageEditor/ImageEditor.svelte';
	import type { EditorOptions } from '../ImageEditor/items/ImageEditorTypes';
	import { createEventDispatcher } from 'svelte';
	import AvatarImageInput from '../ImageInputs/AvatarImageInput.svelte';
	import Icon from './Icon.svelte';
	import IconNext from '../Icons/IconNext.svelte';
	import { Button } from 'flowbite-svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	const dispatch = createEventDispatcher<{ save: { base64: Base64 } }>();

	let result: string | Base64 = '';
	export let profilePicture: URL | string | Base64;
	export let isLoading = false;

	let profilePictureEditorOptions: EditorOptions = {
		cropping: {
			minCropBoxWidth: 160,
			minCropBoxHeight: 160,
			aspectRatio: 1
		}
	};

	const save = () => {
		dispatch('save', { base64: result as Base64 });
	};
</script>

<ImageEditor class="w-[100vw] h-[100vh]" bind:result url={profilePicture}>
	<span slot="bottom">
		<Button
			on:click={save}
			class="h-14 flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl pr-6 pl-6 m-2 rounded-full fill-white"
			color="blue"
		>
			{#if isLoading}
				<SyncLoader color="black" size={30} unit="px" />
			{:else}
				change picture <Icon><IconNext /></Icon>
			{/if}
		</Button>
	</span>
</ImageEditor>
