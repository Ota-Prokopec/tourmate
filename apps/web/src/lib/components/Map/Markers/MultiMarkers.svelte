<script lang="ts">
	import type { Location } from '@app/ts-types';
	import { MarkerLayer, GeoJSON } from 'svelte-maplibre';
	import type { Point, FeatureCollection } from 'geojson';

	export let locations: Location[];

	const mapData: FeatureCollection<Point> = {
		type: 'FeatureCollection',
		features: locations.map((location, i) => ({
			geometry: { type: 'Point', coordinates: location },
			properties: { index: i },
			id: i,
			type: 'Feature'
		}))
	};
</script>

<GeoJSON
	cluster={{
		radius: 500,
		maxZoom: 14,
		properties: {
			total_mag: ['+', ['get', 'mag']]
		}
	}}
	data={mapData}
>
	<MarkerLayer let:feature>
		{@const index = feature.properties.point_count - 1 || feature.properties.index}
		<slot {index} />
	</MarkerLayer>
</GeoJSON>
