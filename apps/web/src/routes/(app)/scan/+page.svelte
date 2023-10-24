<script lang="ts">
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard } from '@app/ts-types';
	import { degreeToMeters, distanceBetweenTwoLocations, metersToDegree } from '@app/utils';
	import lsSvelte from '$lib/utils/lsStore';
	import Row from '$lib/components/Common/Row.svelte';
	import MonumentCardMinimalized from '$lib/components/Experience-monument/Cards/MonumentCardMinimalized.svelte';
	import LocationScanner from '$lib/components/Common/LocationScanner.svelte';
	import Range from '$lib/components/Common/Range.svelte';
	import Text from '$lib/components/Common/Text.svelte';

	let monuments: MonumentCard[] | undefined;

	$: location = $lsSvelte.usersLocation;
	const seconds20 = 20000;
	let range = 200;

	let ableToCheck = true;
	let timeOut: NodeJS.Timeout;
	$: if (!ableToCheck) timeOut = setTimeout(() => (ableToCheck = true), 1000);

	$: console.log(location, ableToCheck, range);

	$: if (ableToCheck) {
		ableToCheck = false;
		if (!location) throw new Error('there is no location');
		checkMonuments(location, range);
	}

	const checkMonuments = async (location: Location, range: number) => {
		const { usersLocation } = $lsSvelte;
		if (!usersLocation) throw new Error("there is no user's location in lsStore");

		const res = await sdk.getListOfMonumentCardsByLocation({
			input: { location: location, range: metersToDegree(range * 40) }
		});
		monuments = res.getListOfMonumentsByLocation;
	};
</script>

<Row class="w-full h-auto min-h-full gap-2 bg-slate-900 overflow-auto">
	<div class="w-full h-[500px] min-h-[100%] flex justify-center items-center relative">
		<LocationScanner />
		<Range class="absolute right-0 m-4" bind:value={range} min={1} max={10000} />
	</div>
	<div class="flex justify-center w-full">
		<Text class="text-white text-center">searching around {range * 40} meters area</Text>
	</div>
	<Row class="w-full justify-center gap-2 mb-2">
		{#if monuments && location}
			{#each monuments as monument}
				<MonumentCardMinimalized dismissable {monument}>
					you are {Math.floor(
						degreeToMeters(distanceBetweenTwoLocations(location, monument.location))
					)} meters far from target
				</MonumentCardMinimalized>
			{/each}
		{/if}
	</Row>
</Row>
