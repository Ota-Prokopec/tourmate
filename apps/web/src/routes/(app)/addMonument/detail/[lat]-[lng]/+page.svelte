<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import TextArea from '$lib/components/Common/TextArea.svelte';
	import { P, Button } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import type {
		Base64,
		GraphqlDocument,
		Location,
		Monument,
		Topic,
		Transport
	} from '@app/ts-types';
	import { AppwriteException } from 'appwrite';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { sdk } from '$src/graphql/sdk';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import TransportType from '$lib/components/Experience-monument/transportType/TransportType.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';

	export let data: PageData;

	let maxLettersCount = 500;

	let name = '';
	let about = '';
	let image: Base64 | undefined;
	let location: Location = data.newMonument.location;
	let placeName = data.newMonument.placeName;
	let topics: Topic[] = [];
	let transports: Transport[] = [];

	let serverResponse: GraphqlDocument<Monument> | undefined;
	let error: AppwriteException;
	let isLoading = false;

	const create = async () => {
		isLoading = true;
		try {
			serverResponse = (
				await sdk.createMonument({
					input: {
						transports: transports,
						about: about,
						location: location,
						name: name,
						picture: image,
						placeName: placeName,
						topics: topics
					}
				})
			).createMonument;
		} catch (err) {
			isLoading = false;
			if (err instanceof AppwriteException) error = err;
		}
		isLoading = false;
	};
</script>

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4">
	{#if !serverResponse || error}
		<Card class="w-full h-min m-4 sm:absolute sm:left-0 z-50">
			<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
			<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{placeName}
			</h5>
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
				lokace: [{data.newMonument.location}]
			</p>
			<ItemsLayout
				let:id
				items={[
					{ title: 'Name', id: 'name' },
					{ title: 'place', id: 'place' },
					{ title: 'typ', id: 'type' },
					{ title: 'transport', id: 'transport' },
					{ title: 'about', id: 'about' },
					{ title: 'image', id: 'image' }
				]}
			>
				{#if id === 'name'}
					<Input
						bind:value={name}
						floatingLabel="name of monument"
						class=" "
						classWrap="w-full max-w-[400px]"
					/>
				{:else if id === 'place'}
					<Input
						bind:value={placeName}
						floatingLabel="umístění"
						class=" "
						classWrap="w-full max-w-[400px]"
					/>
				{:else if id === 'type'}
					<TopicComponent on:choose={(e) => (topics = e.detail)} class="mt-2" />
				{:else if id === 'transport'}
					<TransportType on:choose={(e) => (transports = e.detail)} />
				{:else if id === 'about'}
					<TextArea
						bind:value={about}
						letterCount
						maxLength={maxLettersCount}
						class="h-auto min-h-[200px]"
						classWrap="w-full max-w-[400px]  "
					/>
				{:else if id === 'image'}
					<BasicImageInput
						class="bg-cover w-full min-h-[300px]"
						on:image={(e) => (image = e.detail.base64)}
					/>
				{/if}
			</ItemsLayout>

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

	<Map location={data.newMonument.location} class="h-[100dvh] fixed top-0">
		{#if serverResponse}
			<MonumentMarker bouncing monument={serverResponse} />
		{:else}
			<Marker class="z-50" location={data.newMonument.location}>
				<Icon icon="fas fa-map-marker-alt" class="text-4xl" />
			</Marker>
		{/if}
	</Map>
</div>
