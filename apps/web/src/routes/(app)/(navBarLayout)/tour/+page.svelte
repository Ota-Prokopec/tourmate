<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import ToursSearch from '$lib/components/Search/ToursSearch.svelte';
	import type { PageData } from './$types';

	let searchingText: string = '';
	let isLoading = false;
</script>

<Column class="flex justify-center items-center p-2">
	<SearchInput {isLoading} bind:value={searchingText} />

	<ToursSearch bind:isLoading {searchingText} limit={10} let:tour>
		<TourCardComponent data={tour} />
	</ToursSearch>
</Column>
