<script lang="ts">
	import { sdk } from '$src/graphql/sdk';
	import type { Location, MonumentCard } from '@app/ts-types';
	import { degreeToMeters, distanceBetweenTwoLocations, metersToDegree } from '@app/utils';
	import lsSvelte from '$lib/utils/lsStore';
	import Row from '$lib/components/Common/Row.svelte';
	import LocationScanner from '$lib/components/Common/LocationScanner.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Range from './Components/Range.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCard.svelte';

	let monuments: MonumentCard[] | undefined;

	let range = 10;

	$: location = $lsSvelte.usersLocation;
	const seconds20 = 20000;

	let ableToCheck = true;
	let timeOut: NodeJS.Timeout;
	$: if (!ableToCheck) timeOut = setTimeout(() => (ableToCheck = true), seconds20);

	$: checkMonuments(location, range, ableToCheck).then(() => {
		ableToCheck = false;
	});

	const checkMonuments = async (
		location: Location | undefined,
		range: number,
		ableToCheck: boolean
	) => {
		if (!ableToCheck) throw new Error('you are not able to check monuments - wait 20s');
		if (!location) throw new Error('there is no location');

		const res = await sdk.getListOfMonumentCardsByLocation({
			input: { location: location, range: metersToDegree(range) }
		});
		monuments = res.getListOfMonumentsByLocation;
	};
</script>

<Row class="w-full h-auto min-h-full gap-2 bg-slate-900 overflow-auto">
	<div class="w-full h-[500px] min-h-[100%] flex justify-center items-center relative">
		<LocationScanner>{range}m</LocationScanner>
		<Range bind:value={range} />
	</div>
	<Row class="w-full justify-center gap-2 mb-2">
		{#if monuments && location}
			{#each monuments as monument}
				<MonumentCardComponent minimalized dismissable {monument}>
					you are {Math.floor(
						degreeToMeters(distanceBetweenTwoLocations(location, monument.location))
					)} meters far from target
				</MonumentCardComponent>
			{/each}
		{/if}
	</Row>
</Row>
