<script lang="ts">
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import type { Location } from '@app/ts-types';
	import Geocoding from '../Geocoding/Geocoding.svelte';
	import { createEventDispatcher } from 'svelte';

	export let hidden = true;
	export let searchingLocation: Location | undefined = undefined;
	export let searchingText = '';
</script>

<Drawer bind:hidden placement="auto" class="h-full mobile:w-full">
	<Geocoding bind:searchingText on:clear={() => (searchingLocation = undefined)} on:select />
</Drawer>
