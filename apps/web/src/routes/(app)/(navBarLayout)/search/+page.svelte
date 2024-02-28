<script lang="ts">
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import type { PageData } from './$types';
	import type { Category } from './types';
	import SearchMonuments from './Components/SearchMonuments.svelte';
	import SearchPlaces from './Components/SearchPlaces.svelte';
	import Geocoding from '$lib/components/Map/Geocoding/Geocoding.svelte';
	import SearchUsers from './Components/SearchUsers.svelte';
	import { browser } from '$app/environment';
	import { changeURLwithoutReloading } from '@app/utils';
	import type { Location } from '@app/ts-types';
	import LL from '$src/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { getUrlForSearchPage } from './tools';

	export let data: PageData;

	let searchingText = data.search.searchingText;
	let searchingLocation: Location | undefined;

	let chosenCategory: Category = data.search.category; //data.search.category;

	const changeUrl = () => {
		if (!browser) return;

		changeURLwithoutReloading(getUrlForSearchPage(chosenCategory, searchingText));
	};

	$: if (chosenCategory) {
		changeUrl();
	}

	const categories = [
		{
			title: $LL.page.search.categories.users(),
			key: 'users'
		},
		{
			title: $LL.page.search.categories.monuments(),
			key: 'monuments'
		},
		{
			title: $LL.page.search.categories.places(),
			key: 'places'
		}
	] as const;

	let showBottom = true;
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-4 gap-3">
	{#if chosenCategory === 'users' || chosenCategory === 'monuments'}
		<SearchInput bind:value={searchingText} />
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
		<CategoryPicker bind:chosenCategory {categories} />

		<div class="w-full h-auto flex flex-wrap flex-row gap-2 justify-start items-start">
			{#if chosenCategory === 'monuments'}
				<SearchMonuments limit={data.search.resultLimit} {searchingText} />
			{:else if chosenCategory === 'places'}
				<SearchPlaces limit={data.search.resultLimit} {searchingLocation} />
			{:else if chosenCategory === 'users'}
				<SearchUsers limit={data.search.resultLimit} {searchingText} />
			{/if}
		</div>
	{/if}
</div>
