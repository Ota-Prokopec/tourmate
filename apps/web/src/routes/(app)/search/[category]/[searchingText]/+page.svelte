<script lang="ts">
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { PageData } from './$types';
	import type { Category } from './types';
	import SearchExperiences from './Components/SearchExperiences.svelte';
	import SearchMonuments from './Components/SearchMonuments.svelte';
	import SearchPlaces from './Components/SearchPlaces.svelte';
	import Geocoding from '$lib/components/Map/Geocoding/Geocoding.svelte';
	import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
	import Loading from '$lib/components/Common/Loading.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';

	export let data: PageData;

	let searchingText = data.search.searchingText === 'all' ? '' : data.search.searchingText;

	$: resultSearchedByPlaceGraphqlPromise = sdk.getListOfPlaceCards();

	$: resultSearchedByPlace = useQuery(
		'resultSearchedByPlace',
		async () => await resultSearchedByPlaceGraphqlPromise
	);

	let chosenCategory: Category = data.search.category; //data.search.category;

	const categories = [
		{
			title: 'fotky',
			key: 'experiences'
		},
		{
			title: 'zážitky',
			key: 'monuments'
		},
		{
			title: 'místa',
			key: 'places'
		}
	] as const;

	const search = async () => {};

	let showBottom = true;
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-4 gap-3">
	{#if chosenCategory === 'experiences' || chosenCategory === 'monuments'}
		<SearchInput bind:value={searchingText} />
	{/if}
	{#if chosenCategory === 'places'}
		<Geocoding
			bind:searchingText
			on:showResults={() => (showBottom = false)}
			on:hideResults={() => (showBottom = true)}
			on:select={(e) => {}}
			apiKey={PUBLIC_MAP_TILER_API_KEY}
		/>
	{/if}

	{#if showBottom}
		<CategoryPicker bind:chosenCategory {categories} />

		<div class="w-full h-auto flex flex-wrap flex-row gap-2 justify-start items-start">
			{#if chosenCategory === 'experiences'}
				<SearchExperiences {experiences} />
			{:else if chosenCategory === 'monuments'}
				<SearchMonuments {searchingText} />
			{:else if chosenCategory === 'places'}
				<SearchPlaces
					monuments={$resultSearchedByPlace.data?.getListOfMonuments}
					experiences={$resultSearchedByPlace.data?.getListOfExperiences}
				/>
			{/if}
		</div>
	{/if}
</div>
