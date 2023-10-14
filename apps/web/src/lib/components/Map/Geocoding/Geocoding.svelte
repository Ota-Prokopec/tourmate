<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import { isLocation, type Location } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Item from './Item.svelte';
	import mapTiler from '$lib/utils/mapTiler';
	import type { GeocodingFeature } from '@maptiler/client';
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
	export let limit = 5;
	export let searchingText = '';
	export let showResults = true;
	export let isLoading = false;
	let places: GeocodingFeature[] | undefined;

	$: if (showResults) dispatch('showResults');
	$: if (!showResults) dispatch('hideResults');

	const select = (location: Location, placeName: string) => {
		dispatch('select', {
			location,
			placeName
		});
	};

	const search = async (value: string) => {
		isLoading = true;
		places = await mapTiler.fowardGeocoding(value, { limit: limit, fuzzyMatch });
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
					on:click={() => {
						if (!isLocation(place.center)) throw new Error('center is not type of location');
						select(place.center, place.place_name);
					}}
					data={{ placeName: place.place_name }}
				/>
			{/each}
		</Column>
	{/if}
</div>
