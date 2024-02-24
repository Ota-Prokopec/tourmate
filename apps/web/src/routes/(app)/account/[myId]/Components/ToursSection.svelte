<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Base64, Tour } from '@app/ts-types';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import TourCardComponent from '$lib/components/Experience-monument/Cards/tour/TourCardComponent.svelte';

	export let userId: string;

	let tours: (Omit<Tour, 'monuments'> & { initialTourPicture: string | Base64 })[] = [];
	let initialLoading = false;
	let loadingMoreItems = false;

	const loadTours = async () => {
		initialLoading = tours.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = tours.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfTours({
				limit: 4,
				offset: tours.length,
				userId: userId
			})
			.then(({ getListOfTours: data }) => {
				tours = [
					...tours,
					...data.map((item) => {
						const initialTourPicture = item.monuments.at(0)?.pictureURL;
						if (!initialTourPicture) throw new Error('Tour has no monuments included');

						return {
							userId: item.userId,
							tourName: item.tourName,
							initialTourPicture: initialTourPicture,
							user: item.creator
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
		data={{ img: item.initialTourPicture, tourName: item.tourName, creator: item.user }}
	/>
</Paginating>
