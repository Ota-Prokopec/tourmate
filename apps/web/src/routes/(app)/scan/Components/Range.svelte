<script lang="ts">
	import Range from '$lib/components/Common/Range.svelte';
	export let max = 200;
	export let min = 1;
	export let value: number;
	let range = value / 10;
	$: value = range * 10;
</script>

<Range class="absolute right-0 m-4" bind:value={range} min={1} max={max / 10} />
