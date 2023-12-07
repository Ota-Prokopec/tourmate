<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconGeolocationSearch from '$lib/components/Icons/IconGeolocationSearch.svelte';
	import type { Location } from '@app/ts-types';
	import Marker from '../Marker.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import LL from '$src/i18n/i18n-svelte';

	export let location: Location;
</script>

<Marker {location}>
	<Icon class="child:fill-blue-500 child:w-8 child:h-8">
		<IconGeolocationSearch />
	</Icon>
	<Popover placement="top">
		{$LL.you()}
	</Popover>
</Marker>
