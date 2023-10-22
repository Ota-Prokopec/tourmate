<script lang="ts">
	import { sdk } from '$src/graphql/sdk';
	import type { Monument, MonumentCard } from '@app/ts-types';
	import { getUsersLocation, watchUsersLocation } from '@app/utils';
	import lsSvelte from '$lib/utils/lsStore';
	import Row from '$lib/components/Common/Row.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/MonumentCardMinimalized.svelte';

	let monuments: MonumentCard[] | undefined;

	$: location = $lsSvelte.usersLocation;
	const seconds20 = 20000;

	let ableToCheck = true;
	let timeOut: NodeJS.Timeout;
	$: if (!ableToCheck) timeOut = setTimeout(() => (ableToCheck = true), seconds20);

	$: if (location && ableToCheck) {
		ableToCheck = false;
		checkMonuments();
	}

	const checkMonuments = async () => {
		const { usersLocation } = $lsSvelte;
		if (!usersLocation) throw new Error("there is no user's location in lsStore");

		const res = await sdk.getListOfMonumentCardsByLocation({
			input: { location: usersLocation, range: 0.004 }
		});
		monuments = res.getListOfMonumentsByLocation;
	};
</script>

<div class="w-full h-auto min-h-full bg-slate-900 overflow-auto">
	<div class="w-full h-[500px] min-h-[100%] flex justify-center items-center">
		<div class="w-40 h-40 bg-white rounded-full" />
	</div>
	<Row class="w-full justify-center gap-2 mb-2">
		{#if monuments}
			{#each monuments as monument}
				<MonumentCardComponent dismissable {monument} />
			{/each}
		{/if}
	</Row>
</div>
