<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { MarkerLayer, GeoJSON } from 'svelte-maplibre';
	import type { Point, FeatureCollection } from 'geojson';

	export let locations: Location[];

	const mapData: FeatureCollection<Point> = {
		type: 'FeatureCollection',
		features: locations.map((location, i) => ({
			geometry: { type: 'Point', coordinates: [location[1], location[0]] },
			properties: { index: i },
			id: i,
			type: 'Feature'
		}))
	};
</script>

<GeoJSON
	cluster={{
		radius: 500,
		properties: {}
	}}
	data={mapData}
>
	<MarkerLayer let:feature>
		{#if feature.properties && typeof feature.properties.point_count === 'number'}
			{@const index = feature.properties.index || feature.properties.point_count - 1}
			<slot {index} />
		{/if}
	</MarkerLayer>
</GeoJSON>
