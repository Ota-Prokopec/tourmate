<script lang="ts">
	import lsStore from '$lib/utils/lsStore';
	import { getPlaceDetailsByLatAndLong } from '@app/utils';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { myNewExperienceStore } from './newExperienceStore';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { browser } from '$app/environment';
	import LocationTextInput from '$lib/components/ImageEditor/items/LocationTextInput.svelte';
	import imageSvelte from '@app/image-svelte';
	import { text } from '@sveltejs/kit';
	import type { Base64 } from '@app/ts-types';
	import type { EditorOptions } from '$lib/components/ImageEditor/items/ImageEditorTypes';

	//const { imgSrc } = $myNewExperienceStore;
	const location = $lsStore.usersLocation;
	let result: string | Base64 = '';

	const save = async () => {
		await addLocationLabel();
		sdk.createExperience({
			input: {
				location: [0, 0],
				picture: $imgUrl,
				placeName: 'horni záhoří'
			}
		});
	};

	const [imgUrl, actions, ableToUndo] = imageSvelte({ howManyImagesBeforeUndoAvailable: 1 });

	const addLocationLabel = async () => {
		actions.load(result);

		const ctx = await actions.getCtx();
		if (!ctx?.canvas.height) throw new Error('there is no height in canvas');

		const width = ctx?.canvas.width - 4;
		const height = 180;

		const x = 2;
		const y = ctx?.canvas.height - height;

		actions.addText(textOptions.texts[textOptions.index], {
			x: x,
			y: y,
			vAlign: 'middle',
			justify: false,
			fontSize: 54,
			fontStyle: '',
			debug: false,
			color: textOptions.color,
			font: `'Poppins', sans-serif`,
			width: width,
			height: height
		});
	};

	let textOptions: {
		texts: string[];
		index: number;
		color: string;
	} = {
		texts: [''],
		index: 0,
		color: 'white'
	};

	$: if (location)
		getPlaceDetailsByLatAndLong(location[0], location[1]).then(({ name }) => {
			textOptions.texts = [name, `I was here, ${name}`];
			isLoading = true;
		});

	const editorOptions: EditorOptions = {};

	let isLoading = textOptions.texts.length === 0;
</script>

{#if isLoading}
	<ImageEditor options={editorOptions} bind:result url={$myNewExperienceStore.imgSrc}>
		<span slot="inner">
			{#if browser}
				<LocationTextInput options={textOptions} />
			{/if}
		</span>
		<span slot="bottom">
			<Button
				on:click={save}
				class="h-14 flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl pr-6 pl-6 m-2 rounded-full fill-white"
				color="blue">Create <Icon><IconNext /></Icon></Button
			>
		</span>
	</ImageEditor>
{/if}
