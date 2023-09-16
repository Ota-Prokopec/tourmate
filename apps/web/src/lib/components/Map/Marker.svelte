<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { Marker } from 'svelte-maplibre';
	export let location: Location;
	let className = '';
	export { className as class };
</script>

<Marker class={className} lngLat={{ lat: location[0], lon: location[1] }}>
	<slot />
</Marker>
