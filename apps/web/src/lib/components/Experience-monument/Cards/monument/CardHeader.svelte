<script lang="ts">
	import { goto } from '$app/navigation';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';

	export let monument: { name: string; placeDetail: { name: string } };
</script>

<Column class="gap-2 items-start">
	<Text class="mb-2 text-xl font-bold text-black">
		{monument.name}
	</Text>
	<button on:click={() => goto(`/search/places/${monument.placeDetail.name}`)}>
		<Columns columns="min-content auto" class="gap-1">
			<Icon icon="fas fa-map-marker-alt" class="text-xl " />
			<Text class="text-left">
				{monument.placeDetail.name}
			</Text>
		</Columns>
	</button>
</Column>
