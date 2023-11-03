<script lang="ts">
	import { goto } from '$app/navigation';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import type { MonumentMarkerData } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';

	export let hideDrawer: boolean;
	export let nearMonuments: MonumentMarkerData[];
</script>

<Drawer bind:hidden={hideDrawer} placement="right" width={400}>
	<Row class="gap-4 justify-center">
		<Text class="text-2xl w-full flex justify-center">
			{#if nearMonuments.length}
				Cant find any monument that would fit to you
			{:else}
				Ajjj, no monument here
			{/if}
		</Text>
		<Text>
			{#if nearMonuments.length}
				If you cant choose from monuments that are screen on map you can create.
			{:else}
				You are in the area where are no monuments you could connect, you will have to wait till
				someone will create a new monument in your area or you can create your own monument.
			{/if}
		</Text>
		<Button on:click={() => goto('/addMonument')} color="blue">Create new monument</Button>
	</Row>
</Drawer>
