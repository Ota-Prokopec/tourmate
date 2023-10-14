<script lang="ts">
	import { sdk } from '$src/graphql/sdk';
	import { Monument } from '@app/ts-types';
	import { watchUsersLocation } from '@app/utils';

	let monuments: Monument[] | undefined;

	watchUsersLocation(
		async (location) => {
			const { getListOfMonuments: res } = await sdk.getListOfMonuments({
				input: { location: location, range: 0.004 }
			});
			monuments = res;
		},
		{ enableHighAccuracy: false }
	);
</script>

<div class="w-full h-full">image</div>
