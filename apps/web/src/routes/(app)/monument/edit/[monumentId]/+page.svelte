<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import TextArea from '$lib/components/Common/TextArea.svelte';
	import { P, Button } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import type { Base64, GraphqlDocument, Location, Monument, Topic } from '@app/ts-types';
	import { AppwriteException } from 'appwrite';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { sdk } from '$src/graphql/sdk';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import TopicComponent from '$lib/components/Experience-monument/topic/TopicCreate.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Img from '$lib/components/Common/Img.svelte';

	export let data: PageData;

	let maxLettersCount = 500;

	let name = data.monument.name;
	let about = data.monument.about ?? '';
	let placeName = data.monument.placeDetail.name;
	let topic = data.monument.topic;
	let picture = data.monument.pictureURL;

	let res: GraphqlDocument<Monument> | undefined;
	let error: AppwriteException;
	let isLoading = false;

	const create = async () => {
		isLoading = true;
		try {
		} catch (err) {
			isLoading = false;
			if (err instanceof AppwriteException) error = err;
		}
		isLoading = false;
	};
</script>

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4">
	{#if !res || error}
		<Card class="w-full h-min m-4 sm:absolute sm:left-0 z-50">
			<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
			<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{placeName}
			</h5>
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
				lokace: [{data.monument.location}]
			</p>
			<Text class="w-full max-w-[400px]">
				{data.monument.placeDetail.name}
			</Text>
			<Input
				bind:value={name}
				floatingLabel="name of monument"
				class=" "
				classWrap="w-full max-w-[400px]"
			/>

			<TopicComponent chosenTopic={topic} on:choose={(e) => (topic = e.detail)} class="mt-2" />
			<P size="xl" weight="bold" class="w-full max-w-[400px] m-4">Něco málo o zážitku</P>
			<TextArea
				bind:value={about}
				letterCount
				maxLength={maxLettersCount}
				class="h-auto min-h-[200px]"
				classWrap="w-full max-w-[400px]  "
			/>

			{#if picture}
				<Img class="rounded-2xl" src={picture} />
			{/if}

			<Button
				class="mb-24 mt-4 flex flex-wrap flex-row gap-2 w-min self-end h-min"
				color="blue"
				on:click={create}
			>
				{#if isLoading}
					<Loading />
				{:else}
					<span>Vytvořit</span>
				{/if}
			</Button>
		</Card>
	{/if}

	<Map location={data.monument.location} class="h-[100dvh] fixed top-0">
		{#if res}
			<MonumentMarker bouncing monument={res} />
		{:else}
			<Marker class="z-50" location={data.monument.location}>
				<Icon icon="fas fa-map-marker-alt" class="text-4xl" />
			</Marker>
		{/if}
	</Map>
</div>
