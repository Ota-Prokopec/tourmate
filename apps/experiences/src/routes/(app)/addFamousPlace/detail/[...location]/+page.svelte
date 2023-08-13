<script lang="ts">
	import { getDetailsByLatAndLong } from '@app/utils';
	import type { PageData } from './$types';
	import { useQuery } from '@sveltestack/svelte-query';

	export let data: PageData;

	$: placeDetails = useQuery('placeDetails', async () => {
		await getDetailsByLatAndLong(...data.newFamousPlace.location);
	});
</script>

<div class="w-full h-full">
	<span>{placeDetails}</span>
</div>
