<script lang="ts">
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import IconList from '$lib/components/Icons/IconList.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import CheckpointsListDrawer from '../Components/CheckpointsListDrawer.svelte';
	import CheckpointsSearchDrawer from '../Components/CheckpointsSearchDrawer.svelte';
	import CheckpointsSaveDrawer from '../Components/CheckpointsSaveDrawer.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { navigate } from '$lib/utils/navigator';
	import { alert } from '$src/routes/alertStore';
	import LL from '$src/i18n/i18n-svelte';

	export let searchHidden = true;
	export let listHidden = true;
	export let saveHidden = true;

	export let monuments: MonumentCard[] = [];

	let isSaving = false;

	const save = async ({ tourName, monuments }: { tourName: string; monuments: MonumentCard[] }) => {
		isSaving = true;
		const tour = (
			await sdk.crateTour({
				input: {
					monumentIds: monuments.map((monument) => monument._id),
					tourName: tourName
				}
			})
		).createTour;
		isSaving = false;
		alert('', $LL.page.tour.create.tourSavedMessage(), { color: 'green', timeOut: 2000 });
		navigate('/');
	};
</script>

<Map>
	{#each monuments as monument}
		<MonumentMarker {monument} />
	{/each}
</Map>

<CheckpointsSearchDrawer bind:chosen={monuments} bind:hidden={searchHidden} />
<CheckpointsListDrawer bind:chosen={monuments} bind:hidden={listHidden} />
<CheckpointsSaveDrawer
	on:save={(e) => save({ tourName: e.detail.tourName, monuments: e.detail.monuments })}
	bind:chosen={monuments}
	bind:hidden={saveHidden}
	bind:isSaving
/>

<Row class="absolute bottom-0 w-full h-auto justify-between p-2">
	<Row class="gap-2">
		<Icon
			on:click={() => (searchHidden = false)}
			class="child:w-10 child:h-10 p-2 rounded-full bg-blue-400 child:fill-white"
		>
			<IconPlus />
		</Icon>

		<Icon
			on:click={() => (listHidden = false)}
			class="child:w-10 child:h-10 p-2 rounded-full bg-green-400 child:fill-white "
		>
			<IconList />
		</Icon>
	</Row>
	<ButtonNext on:click={() => (saveHidden = false)} class="" />
</Row>
