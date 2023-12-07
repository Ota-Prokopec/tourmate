<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import LocationScanner from '$lib/components/Common/LocationScanner.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import lsSvelte from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard } from '@app/ts-types';
	import { distanceTo, getPrettyNumber, normalizeMeters } from '@app/utils';
	import Range from './Components/Range.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconPin from '$lib/components/Icons/IconPin.svelte';
	import { goto } from '$app/navigation';

	let monuments: MonumentCard[] | undefined;

	let metersLimit = 8_000;
	let range = 200;

	$: location = $lsSvelte.usersLocation;

	let timeWhenLastLoad: number | undefined = undefined;

	$: checkMonuments(location, range, () => {}).then(() => {});

	const checkMonuments = async (
		location: Location | undefined,
		range: number,
		callback: () => void
	) => {
		const timeAllowesToCheck =
			typeof timeWhenLastLoad !== 'undefined'
				? timeWhenLastLoad / 1000 + 20 < Date.now() / 1000
				: true;

		if (!timeAllowesToCheck) return;
		if (!location) throw new Error('there is no location');

		timeWhenLastLoad = Date.now();

		callback();
		const res = await sdk.getListOfMonumentCards({
			location: { location: location, rangeMeters: range }
		});
		monuments = res.getListOfMonuments;
	};
</script>

<Icon on:click={() => goto('/plan')} class="absolute top-0 left-0 child:w-6 child:h-6 p-2 z-20">
	<IconPin />
</Icon>

<Column
	class="w-full p-2 h-auto min-h-full gap-2 bg-slate-900 overflow-auto flex justify-center items-center"
>
	<div class="w-full h-[500px] min-h-[100%] flex justify-center items-center relative">
		<LocationScanner>{normalizeMeters(range)}</LocationScanner>
		<Range max={metersLimit} bind:value={range} />
	</div>
	<Column class="w-full justify-center gap-2 mb-2 items-center">
		{#if monuments && location}
			{#each monuments as monument}
				<MonumentCardComponent size="normal" dismissable {monument}>
					you are {normalizeMeters(distanceTo(location, monument.location))} far from target
				</MonumentCardComponent>
			{/each}
		{/if}
	</Column>
</Column>
