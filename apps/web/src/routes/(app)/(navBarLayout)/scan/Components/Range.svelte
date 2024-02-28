<script lang="ts">
	import Range from '$lib/components/Common/Range.svelte';

	export let max = 1000;

	export let value: number;
	let range = value / 100;
	$: value = range * (max / 10);
</script>

<Range class="absolute right-0 m-4" bind:value={range} min={1} max={10} />
