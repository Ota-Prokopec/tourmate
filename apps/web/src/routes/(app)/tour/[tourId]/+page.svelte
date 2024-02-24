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
	import type { PageData } from './$types';

	export let data: PageData;

	export let searchHidden = true;
	export let listHidden = true;
	export let saveHidden = true;

	export let monuments: MonumentCard[] = [];

	let isSaving = false;
	let saved: false | { tourName: string } = false;
</script>

<Map>
	{#each monuments as monument}
		<MonumentMarker {monument} />
	{/each}
</Map>

<CheckpointsSearchDrawer bind:chosen={monuments} bind:hidden={searchHidden} />
<CheckpointsListDrawer bind:chosen={monuments} bind:hidden={listHidden} />

<Row class="absolute bottom-0 w-full h-auto justify-between p-2">
	<Icon
		on:click={() => (listHidden = false)}
		class="child:w-10 child:h-10 p-2 rounded-full bg-green-400 child:fill-white "
	>
		<IconList />
	</Icon>
	<ButtonNext on:click={() => (saveHidden = false)} class="" />
</Row>
