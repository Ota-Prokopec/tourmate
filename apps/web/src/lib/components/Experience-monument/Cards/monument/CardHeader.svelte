<script lang="ts">
	import Row from '$lib/components/Common/Row.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { goto } from '$app/navigation';

	export let monument: { name: string; placeDetail: { name: string } };
</script>

<Row class="justify-between gap-2">
	<h5 class="mb-2 text-xl text-black">
		{monument.name}
	</h5>
	<button on:click={() => goto(`/search/places/${monument.placeDetail.name}`)}>
		<Row class="gap-1">
			<Icon icon="fas fa-map-marker-alt" class="text-xl " />
			<Text class="text-right">
				{monument.placeDetail.name}
			</Text>
		</Row>
	</button>
</Row>
