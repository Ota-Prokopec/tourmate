<script lang="ts">
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard } from '@app/ts-types';
	import { degreeToMeters, distanceBetweenTwoLocations, metersToDegree } from '@app/utils';
	import lsSvelte from '$lib/utils/lsStore';
	import Row from '$lib/components/Common/Row.svelte';
	import LocationScanner from '$lib/components/Common/LocationScanner.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Range from './Components/Range.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';

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
			location: { location: location, range: metersToDegree(range) }
		});
		monuments = res.getListOfMonuments;
	};
</script>

<Row class="w-full h-auto min-h-full gap-2 bg-slate-900 overflow-auto">
	<div class="w-full h-[500px] min-h-[100%] flex justify-center items-center relative">
		<LocationScanner
			>{Intl.NumberFormat('en', { notation: 'compact' }).format(range)}m</LocationScanner
		>
		<Range max={metersLimit} bind:value={range} />
	</div>
	<Row class="w-full justify-center gap-2 mb-2">
		{#if monuments && location}
			{#each monuments as monument}
				<MonumentCardComponent size="normal" dismissable {monument}>
					you are {Intl.NumberFormat('en', { notation: 'compact' }).format(
						degreeToMeters(distanceBetweenTwoLocations(location, monument.location))
					)}m far from target
				</MonumentCardComponent>
			{/each}
		{/if}
	</Row>
</Row>
