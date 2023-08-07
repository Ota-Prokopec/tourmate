<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { Marker } from '@beyonk/svelte-mapbox';
	export let location: Location;
	export let label: string = '';
</script>

<Marker {label} lat={location[0]} lng={location[1]} popup={false}>
	<slot />
</Marker>
