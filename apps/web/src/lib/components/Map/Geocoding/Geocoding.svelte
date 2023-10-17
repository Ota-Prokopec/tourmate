<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import { type Location } from '@app/ts-types';
	import { isLocation } from '@app/utils';
	import { createEventDispatcher } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Item from './Item.svelte';
	import mapTiler from '$lib/utils/mapTiler';
	import type { GeocodingFeature } from '@maptiler/client';
	import ClickOutside from '$lib/components/Common/ClickOutside.svelte';
	const dispatch = createEventDispatcher<{
		select: {
			placeName: string;
			location: Location;
		};
		showResults: undefined;
		hideResults: undefined;
	}>();

	export let fuzzyMatch = true;
	export let limit = 10;
	export let searchingText = '';
	export let showResults = true;
	export let isLoading = false;
	let places: GeocodingFeature[] | undefined;

	$: if (showResults) dispatch('showResults');
	$: if (!showResults) dispatch('hideResults');
	$: if (searchingText.length === 0) places = [];
	$: if (!places?.length) showResults = false;

	const select = (location: Location, placeName: string) => {
		searchingText = placeName;
		showResults = false;
		dispatch('select', {
			location,
			placeName
		});
	};

	const search = async (value: string) => {
		if (!searchingText) return;
		showResults = true;
		isLoading = true;
		places = await mapTiler.fowardGeocoding(value, {
			limit: limit,
			fuzzyMatch,
			autocomplete: true
		});
		isLoading = false;
	};

	const onInput = () => {
		showResults = searchingText.length === 0 ? false : true;
	};
</script>

<ClickOutside on:clickOutside={() => (showResults = false)} class="max-w-full w-[400px]">
	<Input
		class="w-full"
		ableClickIcon
		icon
		iconPosition="right"
		bind:value={searchingText}
		on:input={onInput}
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
						select([place.center[1], place.center[0]], place.place_name);
					}}
					data={{ placeName: place.place_name }}
				/>
			{/each}
		</Column>
	{/if}
</ClickOutside>
