<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';

	export let max: number;
	export let progress: number;
	export let showWrittenProgress = false;
	export let labelInside: boolean = false;

	$: value = JSON.stringify((progress / max) * 100);

	let className = '';
	export { className as class };
</script>

<div class={`w-full h-auto flex flex-wrap flex-row justify-center ${className}`}>
	{#if showWrittenProgress}
		<span>{progress}/{max}</span>
	{/if}
	<Progressbar color="blue" size="h-4 w-full" {labelInside} progress={value} />
</div>
