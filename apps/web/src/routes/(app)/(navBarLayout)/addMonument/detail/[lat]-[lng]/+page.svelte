<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import BasicImageInput from '$lib/components/ImageInputs/BasicImageInput.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import MonumentCreateForm from '$src/routes/(app)/(navBarLayout)/monument/Components/MonumentCreateForm.svelte';
	import { alert } from '$src/routes/alertStore';
	import type {
		Base64,
		GraphqlDocument,
		Location,
		Monument,
		QuestionWithCorrectAnswerRequired,
		Topic,
		Transport
	} from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import AddQuestionButton from '../Components/AddQuestionButton.svelte';
	import AddQuestionDrawer from '../Components/AddQuestionDrawer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let aboutLimit = 500;

	let name = '';
	let about = '';
	let image: Base64 | undefined;
	let location: Location = data.newMonument.location;
	let placeName = data.newMonument.placeName;
	let topics: Topic[] = [];
	let transports: Transport[] = [];

	export let question: QuestionWithCorrectAnswerRequired | undefined;

	type ServerResponse = GraphqlDocument<Monument>;
	let serverResponse: ServerResponse | undefined;

	let isLoading = false;
	let questionDrawerHidden = true;

	const create = async () => {
		isLoading = true;
		try {
			if (!image) throw new Error('image is required');
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
			alert('', $LL.page.addMonument.detail.monumentCreated(), { color: 'green' });
			goto('/');
		} catch (err) {
			isLoading = false;
			alert('', $LL.page.addMonument.detail.monumentCreateError(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

<AddQuestionDrawer
	bind:hidden={questionDrawerHidden}
	bind:question
	on:save={(e) => (question = e.detail)}
/>

{#if !serverResponse}
	<MonumentCreateForm
		class="mobile:!m-0 mobile:!w-full mobile:max-w-none"
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
				screenErrors
				class="bg-cover w-full min-h-[300px] mb-4"
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
				<span>{$LL.page.addMonument.detail.create()}</span>
			{/if}
		</Button>
	</MonumentCreateForm>
{/if}

<Map userCenter={data.newMonument.location} class="h-[100dvh] fixed top-0">
	{#if serverResponse}
		<MonumentMarker monumentMarkerData={serverResponse} />
	{:else}
		<Marker class="z-50" location={data.newMonument.location}>
			<Icon>
				<IconLocation />
			</Icon>
		</Marker>
	{/if}
</Map>
