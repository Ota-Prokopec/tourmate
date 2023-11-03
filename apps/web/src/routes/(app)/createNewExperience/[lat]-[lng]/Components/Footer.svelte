<script lang="ts">
	import Loading from '$lib/components/Common/Loading.svelte';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ save: undefined }>();

	export let ableToSave: boolean;
	export let isLoading: boolean;
</script>

<Button
	class=" mt-4 flex flex-wrap flex-row gap-2 w-min self-end h-min"
	color="green"
	on:click={() => dispatch('save')}
	disabled={!ableToSave}
>
	{#if isLoading}
		<Loading />
	{:else}
		<span>Zveřejnit</span>
	{/if}
</Button>
