<script lang="ts">
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { Base64, Location } from '@app/ts-types';
	import Marker from '../Marker.svelte';

	export let location: Location;
	export let userProfilePicture: string | Base64;
</script>

<Marker {location}>
	<Avatar class="rounded-full" src={userProfilePicture} />
	<Popover open placement="top">
		{$LL.component.UserMarker.you()}
	</Popover>
</Marker>
