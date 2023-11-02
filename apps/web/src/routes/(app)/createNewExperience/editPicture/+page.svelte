<script lang="ts">
	import lsStore from '$lib/utils/lsStore';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import { myNewExperienceStore } from './newExperienceStore';
	import { Button, Modal } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { browser } from '$app/environment';
	import LocationTextInput from '$lib/components/ImageEditor/items/LocationTextInput.svelte';
	import imageSvelte from '@app/image-svelte';
	import type { Base64 } from '@app/ts-types';
	import type { EditorOptions } from '$lib/components/ImageEditor/items/ImageEditorTypes';
	import mapTiler from '$lib/utils/mapTiler';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { goto } from '$app/navigation';
	import { navigate } from '$lib/utils/navigator';
	import Row from '$lib/components/Common/Row.svelte';
	import IconText from '$lib/components/Icons/IconText.svelte';
	import ColorPicker from '$lib/components/Common/ColorPicker.svelte';

	if (!$myNewExperienceStore.imgSrc) navigate(-1); // if there is no image return back to previous page => this happends when i goto [lat]-[lng] page and then back to this page so i have to return to page(choose picture)

	const location = $lsStore.usersLocation;
	let isLoading = true;
	let url = $myNewExperienceStore.imgSrc;
	let locationTextMenuOpened = false;

	const save = async () => {
		if (!location) throw new Error('user has no location');
		isLoading = true;

		navigate(`/createNewExperience/editPicture/${location.at(0)}-${location.at(1)}`);
	};

	const [actions] = imageSvelte({ howManyImagesBeforeUndoAvailable: 1 }, (newUrl, o, action) => {
		if (action === 'addText') {
			url = newUrl;
		}
	});
	const addLocationLabel = async () => {
		await actions.load($myNewExperienceStore.imgSrc);
		const ctx = await actions.getCtx();
		const canvas = ctx?.canvas;

		if (!canvas) throw new Error('canvas is not available');
		if (!ctx?.canvas.height) throw new Error('there is no height in canvas');

		const fontSize = 30;

		const x = 2;

		const height = fontSize * 3; // three rows
		const width = ctx?.canvas.width - 2 * x;

		const y = ctx?.canvas.height - height;

		await actions.load(ctx.canvas.toDataURL('image/png'));

		actions.addText(textOptions.texts[textOptions.index], {
			x: x,
			y: y,
			vAlign: 'middle',
			justify: true,
			fontSize: fontSize,
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
		color: 'green'
	};

	$: if (location)
		mapTiler.reverseGeocoding(location[0], location[1], { limit: 1 }).then(([{ place_name }]) => {
			textOptions.texts = [place_name, `I was here, ${place_name}`];
			isLoading = false;
		});

	const editorOptions: EditorOptions = {
		cropping: {
			minCropBoxHeight: 50,
			minCropBoxWidth: 50
		}
	};
</script>

<Modal bind:open={locationTextMenuOpened}>
	{#if browser}
		<LocationTextInput class="relative text-black mb-0 text-[30px]" bind:options={textOptions} />
	{/if}
	<span slot="footer">
		<Row class="gap-2 relative">
			<Button on:click={() => (locationTextMenuOpened = false)} color="red"
				>do not add anything</Button
			>
			<Button
				on:click={async () => {
					await addLocationLabel();
					locationTextMenuOpened = false;
				}}
				color="green">Add this text</Button
			>
			<ColorPicker
				bind:color={textOptions.color}
				orientation="horizontal"
				class="relative z-50 top-0 left-0 w-auto"
			/>
		</Row>
	</span>
</Modal>

{#if !isLoading}
	<ImageEditor options={editorOptions} bind:result={$myNewExperienceStore.imgSrc} {url}>
		<span slot="inner" />
		<span slot="tools">
			<Icon on:click={() => (locationTextMenuOpened = true)} class=" text-4xl"><IconText /></Icon>
		</span>
		<span slot="bottom">
			<div class="w-full bg-gray-400" />

			<Row class="justify-between w-full pb-4 pr-4 pl-4 gap-4 mobile:justify-end">
				<Button
					on:click={save}
					color="green"
					class="h-14 flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl mr-6 ml-6 p-2 py-0 !m-0  fill-white"
					>přeskočit editor
				</Button>
				<Button
					on:click={save}
					color="green"
					class="h-14 flex flex-wrap  flex-row gap-2 top-0 right-0 text-2xl mr-6 ml-6 p-2 py-0 !m-0  fill-white"
					>Create <Icon><IconNext /></Icon></Button
				>
			</Row>
		</span>
	</ImageEditor>
{:else}
	<FullPageLoading />
{/if}
