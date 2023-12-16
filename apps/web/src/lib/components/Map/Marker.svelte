<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { Marker } from 'svelte-maplibre';
	const dispatch = createEventDispatcher<{
		dragend: { location: Location };
	}>();

	export let location: Location;
	export let draggable: boolean = false;

	const onChange = (localLocationValue: Location) => {
		location = localLocationValue;
		dispatch('dragend', { location });
	};

	let className = '';
	export { className as class };
</script>

<Marker
	{draggable}
	on:dragend={(e) => onChange([e.detail.lngLat[1], e.detail.lngLat[0]])}
	class={className}
	lngLat={{ lat: location[0], lon: location[1] }}
>
	<button on:click> <slot /> </button>
</Marker>
