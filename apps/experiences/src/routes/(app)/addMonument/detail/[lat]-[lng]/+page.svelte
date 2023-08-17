<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import TextArea from '$lib/components/Common/TextArea.svelte';
	import { P, Button } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import { trpc } from '$lib/trpc';
	import { page } from '$app/stores';
	import ImageInput from '$lib/components/Common/ImageInput.svelte';
	import type { Base64, Monument } from '@app/ts-types';
	import { AppwriteException } from 'appwrite';
	import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-client/src/transformers';
	import type { Models } from 'node-appwrite';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	import { getDetailsByLatAndLong } from '@app/utils';
	import Popover from '$lib/components/Common/Popover.svelte';

	export let data: PageData;

	let maxLettersCount = 500;
	let name = '';
	let about = '';
	let image: Base64 | undefined;
	let res: Monument & Models.Document;
	let error: AppwriteException;

	const create = async () => {
		try {
			res = await trpc($page).experience.createMonument.mutate({
				location: data.newMonument.location,
				name: name,
				about: about,
				pictureURL: image
			});
		} catch (err) {
			if (err instanceof AppwriteException) error = err;
		}
	};
</script>

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4">
	{#if !res || error}
		<Card class="w-full h-min m-4 sm:absolute sm:left-0 z-50">
			<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
			<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{data.newMonument.placeName}
			</h5>
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
				lokace: [{data.newMonument.location}]
			</p>
			<Input
				bind:value={name}
				floatingLabel="name of monument"
				class=" "
				classWrap="w-full max-w-[400px]"
			/>
			<P size="xl" weight="bold" class="w-full max-w-[400px] m-4">Něco málo o místu</P>
			<TextArea
				bind:value={about}
				letterCount
				maxLength={maxLettersCount}
				class="h-auto min-h-[200px]"
				classWrap="w-full max-w-[400px]  "
			/>

			<P size="xl" weight="bold" class="w-full max-w-[400px] m-4">Přidat fotku</P>
			<ImageInput on:image={(e) => (image = e.detail.base64)} />

			<Button
				class="mb-24 mt-4 flex flex-wrap flex-row gap-2 w-min self-end h-min"
				color="blue"
				on:click={create}
			>
				<span>Vytvořit</span>
			</Button>
		</Card>
	{/if}

	<Map location={data.newMonument.location} class="h-[100dvh] fixed top-0">
		{#if res}
			<MonumentMarker bouncing monument={res} />
		{:else}
			<Marker class="z-50" location={data.newMonument.location}>
				<Icon icon="fas fa-map-marker-alt" class="text-4xl" />
			</Marker>
		{/if}
		{#each data.monuments as monument}
			<MonumentMarker {monument} />
		{/each}
	</Map>
</div>
