<script lang="ts">
	import { Queries, collections } from '$lib/appwrite/appwrite';
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Eval from '$lib/components/Common/Eval.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { MonumentMarkerData } from '@app/ts-types';
	import { getUsersLocation } from '@app/utils';
	import { AnimatedCounter } from '@benzara/svelte-animated-counter';
	import { useQuery } from '@sveltestack/svelte-query';

	let location = $lsStore.usersLocation;
	let monumentsPromise: undefined | Promise<{ getListOfMonuments: MonumentMarkerData[] }>;

	$: monumentsCount = useQuery('monumentsCount', async () => {
		return (await collections.monument.listDocuments([Queries.monument.limit(1)])).total;
	});

	const getMonuments = async () => {
		try {
			monumentsPromise = sdk.getListOfMonumentsForMap({
				location: {
					location:
						location ?? (await getUsersLocation({ maximumAge: 1000, enableHighAccuracy: false })),
					rangeMeters: 10000 //meters
				}
			});
		} catch (error) {
			alert('', $LL.error.monumentLoadErrorMessage(), { color: 'red' });
		}
	};

	getMonuments();
</script>

<Column>
	<Card class="justify-center items-center flex mobile:w-full min-h-[400px] !p-10 sm:min-w-[400px]">
		<Text class="text-9xl font-bold text-center">
			{#if $monumentsCount.data}
				<AnimatedCounter
					values={Array.from({ length: $monumentsCount.data }, (_, i) => i.toString())}
					class="custom-counter"
					interval={35}
					startImmediately={true}
					direction="up"
					loop={false}
					ease="cubic-bezier(0.25, 0.1, 0.25, 1)"
					initialValue="0"
				/>
			{:else}
				0
			{/if}
		</Text>
		<Text class="text-3xl">
			{$LL.page.monumentsCount.label()}
		</Text>
	</Card>
	<Map class="w-full h-[100vh] fixed bottom-0 z-20" deg={45} userCenter={location}>
		{#await monumentsPromise then monuments}
			{#if monuments}
				{#each monuments.getListOfMonuments as monument}
					<MonumentMarker classDrawer="!pb-bottomNavBarHeightSize" zoom={10} {monument} />
				{/each}
			{/if}
		{:catch}
			<Eval
				evaluate={alert('', $LL.error.monumentLoadErrorMessage(), {
					color: 'red'
				})}
			/>
		{/await}
	</Map>
</Column>
