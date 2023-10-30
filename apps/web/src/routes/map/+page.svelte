<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import MultiMarkers from '$lib/components/Map/Markers/MultiMarkers.svelte';
</script>

<Map>
	<MultiMarkers
		let:index
		locations={[
			[49, 50],
			[50, 50],
			[50, 51],
			[50, 52]
		]}
	>
		{index}
	</MultiMarkers>
</Map>
