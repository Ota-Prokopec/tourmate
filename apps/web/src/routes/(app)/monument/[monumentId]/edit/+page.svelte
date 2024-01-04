<script lang="ts">
	import { collections } from '$lib/appwrite/appwrite';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Img from '$lib/components/Common/Img.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import AddQuestionButton from '$src/routes/(app)/addMonument/detail/Components/AddQuestionButton.svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentMarkerData, Question } from '@app/ts-types';
	import { AppwriteException } from 'appwrite';
	import { Button } from 'flowbite-svelte';
	import MonumentCreateForm from '../../Components/MonumentCreateForm.svelte';
	import type { PageData } from './$types';

	//TODO: dont update question because user has already answered your old one or it was without any question and know there would be a problem => and it will be much easier to dont update or create a new question to already made monument

	export let data: PageData;

	let aboutLimit = 500;

	let name = data.monument.name;
	let about = data.monument.about ?? '';
	let placeName = data.monument.placeDetail.name;
	let topics = data.monument.topics;
	let picture = data.monument.pictureURL;
	let transports = data.monument.transports;

	const question: Question | undefined = data.monument.question ?? undefined;
	let questionDrawerHidden = true;

	let res: MonumentMarkerData | undefined;
	let error: AppwriteException;
	let isLoading = false;

	const update = async () => {
		try {
			isLoading = true;

			await collections.monument.updateDocument(data.monument._id, {
				name: name,
				topics: topics,
				transports: transports,
				about: about
			});

			isLoading = false;
		} catch (error) {
			alert('', $LL.page.monument.edit.updateError(), { color: 'red' });
		}
	};
</script>

{#if !res || error}
	<MonumentCreateForm
		class="mobile:!m-0"
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
				<Img class="rounded-2xl mb-4" src={picture} />
			{/if}
		</svelte:fragment>

		<AddQuestionButton disabled {question} on:click={() => (questionDrawerHidden = false)} />

		<Right class="mt-4">
			<Button color="green" on:click={update}>
				{#if isLoading}
					<Loading />
				{:else}
					{$LL.page.monument.edit.save()}
				{/if}
			</Button>
		</Right>
	</MonumentCreateForm>
{/if}

<Map center={data.monument.location} class="h-[100dvh] fixed top-0">
	{#if res}
		<MonumentMarker monument={res} />
	{:else}
		<Marker class="z-50" location={data.monument.location}>
			<Icon icon="fas fa-map-marker-alt" class="text-4xl" />
		</Marker>
	{/if}
</Map>
