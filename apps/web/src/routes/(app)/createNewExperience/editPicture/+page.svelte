<script lang="ts">
	import { browser } from '$app/environment';
	import ColorPicker from '$lib/components/Common/ColorPicker.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import IconText from '$lib/components/Icons/IconText.svelte';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import type { EditorOptions } from '$lib/components/ImageEditor/items/ImageEditorTypes';
	import LocationTextInput from '$lib/components/ImageEditor/items/LocationTextInput.svelte';
	import lsStore from '$lib/utils/lsStore';
	import mapTiler from '$lib/utils/mapTiler';
	import { navigate } from '$lib/utils/navigator';
	import imageSvelte from '@app/image-svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import LL, { locale } from '$src/i18n/i18n-svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import ClickOutside from '$lib/components/Common/ClickOutside.svelte';

	if (!$lsStore.newExperiencePicture) navigate('/createNewExperience'); // if there is no image return back to previous page => this happends when i goto [lat]-[lng] page and then back to this page so i have to return to page(choose picture)

	const location = $lsStore.usersLocation;
	let isLoading = true;
	$: url = $lsStore.newExperiencePicture;
	let locationTextMenuOpened = false;

	const save = async () => {
		if (!location) throw new Error('user has no location');
		isLoading = true;

		navigate(`/createNewExperience/${location.at(0)}-${location.at(1)}`);
	};

	const [actions] = imageSvelte({ howManyImagesBeforeUndoAvailable: 1 }, (newUrl, o, action) => {
		if (action === 'addText') {
			url = newUrl;
		}
	});
	const addLocationLabel = async () => {
		if (!url) throw new Error('there is no experience picture in lsStore');
		await actions.load(url);
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
		mapTiler
			.reverseGeocoding(location[0], location[1], { limit: 1, language: $locale })
			.then(([{ place_name }]) => {
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
			<Button on:click={() => (locationTextMenuOpened = false)} color="red">{$LL.back()}</Button>
			<Button
				on:click={async () => {
					await addLocationLabel();
					locationTextMenuOpened = false;
				}}
				color="green">{$LL.addThisLabel()}</Button
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
	<ImageEditor options={editorOptions} bind:result={$lsStore.newExperiencePicture} {url}>
		<span slot="tools">
			<Icon on:click={() => (locationTextMenuOpened = true)} class=" text-4xl"><IconText /></Icon>
		</span>
		<span slot="bottom">
			<div class="w-full bg-gray-400" />

			<Right class="w-full p-4">
				<Button
					on:click={save}
					color="green"
					class=" flex flex-wrap  flex-row gap-2 top-0 right-0 text-2xl mr-6 ml-6 !m-0  fill-white"
					>{$LL.continue()} <Icon><IconNext /></Icon></Button
				>
			</Right>
		</span>
	</ImageEditor>
{:else}
	<FullPageLoading />
{/if}
