<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { Marker } from 'svelte-maplibre';
	export let location: Location;
</script>

<Marker interactive lngLat={{ lat: location[0], lon: location[1] }}>
	<slot />
</Marker>
