<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import ToursSection from '$lib/components/Paginators/ToursPaginator.svelte';
	import ToursSearch from '$lib/components/Search/ToursSearch.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchingText: string = '';
</script>

<Column class="flex justify-center items-center p-2">
	<SearchInput bind:value={searchingText} />

	<ToursSearch {searchingText} limit={10} let:tour>
		<TourCardComponent data={tour} />
	</ToursSearch>
</Column>
