<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { P, Button } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import type { Base64, GraphqlDocument, Location, Monument, Topic } from '@app/ts-types';
	import { AppwriteException } from 'appwrite';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Img from '$lib/components/Common/Img.svelte';
	import { collections } from '$lib/appwrite/appwrite';
	import MonumentCreateForm from '../../Components/MonumentCreateForm.svelte';

	export let data: PageData;

	let aboutLimit = 500;

	let name = data.monument.name;
	let about = data.monument.about ?? '';
	let placeName = data.monument.placeDetail.name;
	let topics = data.monument.topics;
	let picture = data.monument.pictureURL;
	let transports = data.monument.transports;

	let res: GraphqlDocument<Monument> | undefined;
	let error: AppwriteException;
	let isLoading = false;

	const update = async () => {
		isLoading = true;

		await collections.monument.updateDocument(data.monument._id, {
			name: name,
			topics: topics,
			transports: transports,
			about: about
		});

		isLoading = false;
	};
</script>

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4">
	{#if !res || error}
		<MonumentCreateForm
			{placeName}
			location={data.monument.location}
			bind:name
			bind:about
			bind:topics
			bind:transports
			{aboutLimit}
		>
			<svelte:fragment slot="image">
				{#if picture}
					<Img class="rounded-2xl" src={picture} />
				{/if}
			</svelte:fragment>

			<Button
				class="mb-24 mt-4 flex flex-wrap flex-row gap-2 w-min self-end h-min"
				color="blue"
				on:click={update}
			>
				{#if isLoading}
					<Loading />
				{:else}
					<span>Uložil změny</span>
				{/if}
			</Button>
		</MonumentCreateForm>
	{/if}

	<Map location={data.monument.location} class="h-[100dvh] fixed top-0">
		{#if res}
			<MonumentMarker monument={res} />
		{:else}
			<Marker class="z-50" location={data.monument.location}>
				<Icon icon="fas fa-map-marker-alt" class="text-4xl" />
			</Marker>
		{/if}
	</Map>
</div>
