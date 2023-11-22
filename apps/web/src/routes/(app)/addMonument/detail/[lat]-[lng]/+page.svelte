<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { sdk } from '$src/graphql/sdk';
	import MonumentCreateForm from '$src/routes/(app)/monument/Components/MonumentCreateForm.svelte';
	import type {
		Answer,
		AnswerType,
		Base64,
		GraphqlDocument,
		Location,
		Monument,
		Question,
		Topic,
		Transport
	} from '@app/ts-types';
	import { AppwriteException } from 'appwrite';
	import { Button } from 'flowbite-svelte';
	import AddQuestionDrawer from '../Components/AddQuestionDrawer.svelte';
	import type { PageData } from './$types';
	import AddQuestionButton from '../Components/AddQuestionButton.svelte';

	export let data: PageData;

	let aboutLimit = 500;

	let name = '';
	let about = '';
	let image: Base64 | undefined;
	let location: Location = data.newMonument.location;
	let placeName = data.newMonument.placeName;
	let topics: Topic[] = [];
	let transports: Transport[] = [];

	let question:
		| (Omit<Question<AnswerType>, 'pickingAnswers'> & { pickingAnswers?: Answer['pickingAnswers'] })
		| undefined;

	let serverResponse: GraphqlDocument<Monument> | undefined;
	let error: AppwriteException;
	let isLoading = false;
	let questionDrawerHidden = true;

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
						topics: topics,
						question: question
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

<AddQuestionDrawer
	bind:hidden={questionDrawerHidden}
	bind:question
	on:save={(e) => (question = e.detail)}
/>

{#if !serverResponse || error}
	<MonumentCreateForm
		{placeName}
		{location}
		bind:name
		bind:about
		bind:topics
		bind:transports
		{aboutLimit}
	>
		<svelte:fragment slot="image">
			<BasicImageInput
				class="bg-cover w-full min-h-[300px]"
				on:image={(e) => (image = e.detail.base64)}
			/>
		</svelte:fragment>

		<AddQuestionButton {question} on:click={() => (questionDrawerHidden = false)} />

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
	</MonumentCreateForm>
{/if}

<Map location={data.newMonument.location} class="h-[100dvh] fixed top-0">
	{#if serverResponse}
		<MonumentMarker monument={serverResponse} />
	{:else}
		<Marker class="z-50" location={data.newMonument.location}>
			<Icon icon="fas fa-map-marker-alt" class="text-4xl" />
		</Marker>
	{/if}
</Map>
