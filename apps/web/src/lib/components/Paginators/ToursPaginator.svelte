<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { TTourCard } from '@app/ts-types';

	export let userId: string | undefined = undefined;
	export let searchingText: string | undefined = undefined;

	let tours: TTourCard[] = [];
	let initialLoading = false;
	let loadingMoreItems = false;

	const loadTours = async () => {
		initialLoading = tours.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = tours.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfTours({
				limit: 4,
				offset: tours.length,
				userId: userId,
				tourName: searchingText
			})
			.then(({ getListOfTours: data }) => {
				tours = [
					...tours,
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
		initialLoading = false;
		loadingMoreItems = false;
	};

	loadTours();
</script>

<Paginating
	wrapperClassName="mt-10 p-2"
	let:item
	{loadingMoreItems}
	{initialLoading}
	list={tours}
	on:loadMore={loadTours}
>
	<svelte:fragment slot="loading">
		<FullPageLoading />
	</svelte:fragment>

	<TourCardComponent
		data={{
			...item
		}}
	/>
</Paginating>
