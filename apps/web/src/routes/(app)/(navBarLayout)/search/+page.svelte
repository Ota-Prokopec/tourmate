<script lang="ts">
	import { browser } from '$app/environment';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import Geocoding from '$lib/components/Map/Geocoding/Geocoding.svelte';
	import MonumentsSearch from '$lib/components/Search/MonumentsSearch.svelte';
	import PlacesSearch from '$lib/components/Search/PlacesSearch.svelte';
	import UsersSearch from '$lib/components/Search/UsersSearch.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { Location } from '@app/ts-types';
	import { changeURLwithoutReloading } from '@app/utils';
	import type { PageData } from './$types';
	import SearchCategoryPicker from './Components/SearchCategoryPicker.svelte';
	import { getUrlForSearchPage } from './tools';
	import type { TSearchCategory } from './types';

	export let data: PageData;

	let searchingText = data.search.searchingText;
	let searchingLocation: Location | undefined;
	let isLoading = false;

	let chosenCategory: TSearchCategory = data.search.category; //data.search.category;

	const changeUrl = () => {
		if (!browser) return;

		changeURLwithoutReloading(getUrlForSearchPage(chosenCategory, searchingText));
	};

	$: if (chosenCategory) {
		changeUrl();
	}

	let showBottom = true;
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-4 gap-3">
	{#if chosenCategory === 'users' || chosenCategory === 'monuments'}
		<SearchInput {isLoading} bind:value={searchingText} />
	{/if}
	{#if chosenCategory === 'places'}
		<Geocoding
			bind:searchingText
			on:clear={() => (searchingLocation = undefined)}
			on:showResults={() => (showBottom = false)}
			on:hideResults={() => (showBottom = true)}
			on:select={(e) => {
				searchingLocation = e.detail.location;
			}}
		/>
	{/if}

	{#if showBottom}
		<SearchCategoryPicker bind:category={chosenCategory} />

		<div class="w-full h-auto flex flex-wrap flex-row gap-2 justify-start items-start">
			{#if chosenCategory === 'monuments'}
				<MonumentsSearch
					bind:isLoading
					let:monument
					limit={data.search.resultLimit}
					{searchingText}
				>
					<MonumentCardComponent size="normal" {monument} />
					<svelte:fragment slot="loading">
						<MonumentCardSkeleton size="normal" />
						<MonumentCardSkeleton size="normal" />
						<MonumentCardSkeleton size="normal" />
					</svelte:fragment>
				</MonumentsSearch>
			{:else if chosenCategory === 'places'}
				<PlacesSearch bind:isLoading limit={data.search.resultLimit} {searchingLocation} />
			{:else if chosenCategory === 'users'}
				<UsersSearch bind:isLoading limit={data.search.resultLimit} {searchingText} />
			{/if}
		</div>
	{/if}
</div>
