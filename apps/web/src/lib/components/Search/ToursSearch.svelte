<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import NoContent from '$lib/components/Common/NoContent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard, TTourCard, Tour } from '@app/ts-types';

	export let searchingText: string;

	export let limit: number = 10;

	let tours: TTourCard[] = [];
	let isLoading = true;
	let isLoadMoreButtonLoading = false;

	const loadMonuments = async (inputValue: string) => {
		try {
			isLoadMoreButtonLoading = true;
			await sdk
				.getListOfTours({
					limit: 4,
					tourName: searchingText
				})
				.then(({ getListOfTours: data }) => {
					tours = [
						...data.map((item) => {
							const initialTourPicture = item.monuments.at(0)?.pictureURL;
							if (!initialTourPicture) throw new Error('Tour has no monuments included');

							return {
								initialTourPicture: initialTourPicture,
								user: item.creator,
								...item
							};
						})
					];
				});
		} catch (error) {
			alert('', $LL.error.unexpectedError(), { color: 'red' });
		}
		isLoading = false;
	};

	$: loadMonuments(searchingText);
</script>

<Column class="w-full items-center">
	{#if isLoading}
		<FullPageLoading />
	{:else if tours?.length}
		{#each tours as tour}
			<slot {tour} />
		{/each}
	{:else}
		<NoContent />
	{/if}
</Column>
