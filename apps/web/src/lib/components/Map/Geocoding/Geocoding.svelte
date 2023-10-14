<script lang="ts">
	import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import type { Location } from '@app/ts-types';
	import { get } from '@app/utils';
	import type { Feature } from '@maptiler/geocoding-control/types';
	import type { Geometry } from 'geojson/index.d.ts';
	import { createEventDispatcher } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Item from './Item.svelte';
	const dispatch = createEventDispatcher<{
		select: {
			placeName: string;
			location: Location;
		};
		showResults: undefined;
		hideResults: undefined;
	}>();

	const url = 'https://api.maptiler.com/geocoding';
	export let autocomplete = false;
	export let fuzzyMatch = true;
	export let apiKey: string;
	export let limit = 5;
	export let searchingText = '';
	export let showResults = true;
	export let isLoading = false;
	let places: Feature<Geometry>[] | undefined;

	$: if (showResults) dispatch('showResults');
	$: if (!showResults) dispatch('hideResults');

	const select = (location: Location, placeName: string) => {
		dispatch('select', {
			location,
			placeName
		});
	};

	const getFullUrl = (search: string): string => {
		return `${url}/${search}.json?autocomplete=${autocomplete}&fuzzyMatch=${fuzzyMatch}&limit=${limit}&key=${apiKey}`;
	};

	const search = async (value: string) => {
		isLoading = true;
		places = ((await get(getFullUrl(value))) as { features: typeof places }).features;
		isLoading = false;
	};
</script>

<div class="max-w-full w-[400px]">
	<Input
		class="w-full"
		ableClickIcon
		icon
		iconPosition="right"
		bind:value={searchingText}
		on:focus
		on:focus={() => (showResults = true)}
		on:blur={() => (showResults = false)}
		on:input={() => search(searchingText)}
		on:iconClick={() => search(searchingText)}
	>
		{#if isLoading}
			<SyncLoader color="black" size="30" unit="px" />
		{:else}
			<Icon on:click={() => search(searchingText)}>
				<IconMagnifyingGlass />
			</Icon>
		{/if}
	</Input>
	{#if places && showResults}
		<Column>
			{#each places as place}
				<Item
					on:click={() => select(place.center, place.place_name)}
					data={{ placeName: place.place_name }}
				/>
			{/each}
		</Column>
	{/if}
</div>
