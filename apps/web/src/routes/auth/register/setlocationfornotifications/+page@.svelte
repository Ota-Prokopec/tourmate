<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Full from '$lib/components/Common/Full.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MapDragMarker from '$lib/components/Map/MapDragMarker.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { Location } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';

	let markerLocation: Location;
</script>

<Full class="justify-center flex">
	<MapDragMarker bind:markerLocation />
	<Alert class="absolute bottom-0 m-2 ">
		<Column>
			<Text class="text-lg text-center">{$LL.chooseYourLocationForNotifications()}</Text>
			<Right><Button color="green">{$LL.save()}</Button></Right>
		</Column>
	</Alert>
</Full>
