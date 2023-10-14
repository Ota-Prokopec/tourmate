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

	export let data: PageData;

	let searchingText = data.search.searchingText;
	let searchingLocation: Location | undefined;

	let chosenCategory: Category = data.search.category; //data.search.category;

	const changeUrl = () => {
		if (!browser) return;
		changeURLwithoutReloading(
			`${location.origin}/search/${chosenCategory}/${searchingText || '*'}`
		);
	};

	$: if (chosenCategory) changeUrl();
	$: if (searchingText || !searchingText) changeUrl();

	const categories = [
		{
			title: 'users',
			key: 'users'
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

	let showBottom = true;
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-4 gap-3">
	{#if chosenCategory === 'users' || chosenCategory === 'monuments'}
		<SearchInput bind:value={searchingText} />
	{/if}
	{#if chosenCategory === 'places'}
		<Geocoding
			bind:searchingText
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
				<SearchMonuments {searchingText} />
			{:else if chosenCategory === 'places'}
				<SearchPlaces {searchingLocation} />
			{:else if chosenCategory === 'users'}
				<SearchUsers {searchingText} />
			{/if}
		</div>
	{/if}
</div>
