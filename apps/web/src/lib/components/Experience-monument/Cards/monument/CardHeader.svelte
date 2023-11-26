<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';

	export let monument: { name: string; placeDetail: { name: string } };
</script>

<Row class="justify-between gap-2">
	<Text class="mb-2 text-xl font-bold text-black">
		{monument.name}
	</Text>
	<button on:click={() => goto(`/search/places/${monument.placeDetail.name}`)}>
		<Row class="gap-1">
			<Icon icon="fas fa-map-marker-alt" class="text-xl " />
			<Text class="text-right">
				{monument.placeDetail.name}
			</Text>
		</Row>
	</button>
</Row>
