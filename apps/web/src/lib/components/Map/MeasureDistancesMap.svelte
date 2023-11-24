<script lang="ts">
	import type { Location } from '@app/ts-types';
	import MapComponent from './Map.svelte';
	import type { Map } from 'maplibre-gl';
	import { lineDistance } from '@turf/turf';
	import type { Feature, LineString } from 'geojson';
	import { isLocation } from '@app/utils';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{
		newPoint: { location: Location };
	}>();

	export let map: Map | undefined = undefined;

	export let maxZoom: number | undefined = undefined;
	export let minZoom: number | undefined = undefined;

	/**
	 * @param wholeDistanceInMeters is in meters
	 */
	export let wholeDistanceInMeters: number = 0;
	export let lines: Feature<LineString>[] = [];

	let distanceContainer: HTMLElement | null;

	// GeoJSON object to hold our measurement features
	const geojson: {
		type: string;
		features: any[];
	} = {
		type: 'FeatureCollection',
		features: []
	};

	// Used to draw a line between points
	const linestring: Feature<LineString> = {
		type: 'Feature',
		id: 'id',
		properties: {},
		geometry: {
			type: 'LineString',
			coordinates: []
		}
	};

	$: map?.on('load', () => {
		if (!map) throw new Error('map is not defined');
		map.addSource('geojson', {
			type: 'geojson',
			data: geojson
		});

		// Add styles to the map
		map.addLayer({
			id: 'measure-points',
			type: 'circle',
			source: 'geojson',
			paint: {
				'circle-radius': 5,
				'circle-color': '#000'
			},
			filter: ['in', '$type', 'Point']
		});
		map.addLayer({
			id: 'measure-lines',
			type: 'line',
			source: 'geojson',
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			},
			paint: {
				'line-color': '#000',
				'line-width': 2.5
			},
			filter: ['in', '$type', 'LineString']
		});

		map.on('click', (e) => {
			if (!map) throw new Error('map is not defined');
			const features = map.queryRenderedFeatures(e.point, {
				layers: ['measure-points']
			});

			// Remove the linestring from the group
			// So we can redraw it based on the points collection
			if (geojson.features.length > 1) geojson.features.pop();

			// Clear the Distance container to populate it with a new value
			if (!distanceContainer) throw new Error('distanceContainer is not defined');
			distanceContainer.innerHTML = '';

			// If a feature was clicked, remove it from the map
			if (features.length) {
				const id = features[0].properties.id;
				geojson.features = geojson.features.filter((point) => {
					return point.properties.id !== id;
				});
			} else {
				const point = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [e.lngLat.lng, e.lngLat.lat]
					},
					properties: {
						id: String(new Date().getTime())
					}
				};

				geojson.features.push(point);

				const location = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
				if (!isLocation(location)) throw new Error('the output is not type of Location');

				dispatch('newPoint', { location: location });
			}

			if (geojson.features.length > 1) {
				linestring.geometry.coordinates = geojson.features.map((point) => {
					if (!point.geometry) throw new Error('point.geometry is not defined');
					return point.geometry.coordinates;
				});

				geojson.features.push(linestring);
				wholeDistanceInMeters = lineDistance(linestring, 'kilometers') * 1000;
				lines = [...lines, linestring];
			}

			if (!map) throw new Error('map is not defined');
			const source = map.getSource('geojson');
			if (!source) throw new Error('source is not defined');
			source.setData(geojson);
		});
	});

	$: map?.on('mousemove', (e) => {
		if (!map) throw new Error('map is not defined');

		const features = map.queryRenderedFeatures(e.point, {
			layers: ['measure-points']
		});
		// UI indicator for clicking/hovering a point on the map
		map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
	});

	let className = '';
	export { className as class };
</script>

<MapComponent {maxZoom} {minZoom} class={className} bind:map>
	<slot />
</MapComponent>
<div bind:this={distanceContainer} id="distance" class="distance-container" />

<style>
	.distance-container {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1;
	}

	.distance-container > * {
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		font-size: 11px;
		line-height: 18px;
		display: block;
		margin: 0;
		padding: 5px 10px;
		border-radius: 3px;
	}
</style>
