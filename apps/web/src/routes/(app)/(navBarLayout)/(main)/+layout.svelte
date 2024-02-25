<script lang="ts">
	import Tutorial from '$lib/components/Common/Tutorial.svelte';
	import lsStore, { storage } from '$lib/utils/lsStore';

	$: firstTime = $lsStore.firstTime;
</script>

{#if firstTime !== false}
	<Tutorial on:close={() => ($lsStore.firstTime = false)} />
{/if}

<slot />
