<script lang="ts">
	import { goto } from '$app/navigation';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { navigate } from '$lib/utils/navigator';
	import { getUrlForSearchPage } from '$src/routes/(app)/search/tools';

	export let monument: { name: string; placeDetail: { name: string } };
</script>

<Column class="gap-2 items-start">
	<Text class="mb-2 text-xl font-bold text-black">
		{monument.name}
	</Text>
	<button on:click={() => navigate(getUrlForSearchPage('places'))}>
		<Columns columns="min-content auto" class="gap-1">
			<Icon class="child:w-6 child:h-6">
				<IconLocation />
			</Icon>
			<Text class="text-left">
				{monument.placeDetail.name}
			</Text>
		</Columns>
	</button>
</Column>
