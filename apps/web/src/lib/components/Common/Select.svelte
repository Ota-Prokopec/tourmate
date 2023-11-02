<script lang="ts">
	export let items: { key: string; value: string }[];
	export let selectedKey = items.at(0)?.key;

	let className = '';
	export { className as class };
</script>

<select class={className}>
	{#each items as item}
		<option
			on:select={() => (selectedKey = item.key)}
			selected={selectedKey === item.key}
			value={item.key}>{item.value}</option
		>
	{/each}
</select>
