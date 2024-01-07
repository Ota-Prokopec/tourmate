<script lang="ts">
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import type { Location } from '@app/ts-types';
	import Geocoding from '../Geocoding/Geocoding.svelte';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';

	export let hidden: boolean;
	export let searchingLocation: Location | undefined = undefined;
	export let searchingText = '';
</script>

<Drawer bind:hidden placement="auto" class="h-full mobile:w-full">
	<Icon on:click={() => (hidden = true)} class="child:w-8 child:h-8 absolute top-0 right-0 m-2">
		<IconTimes />
	</Icon>
	<Geocoding
		class="mt-[32px]"
		bind:searchingText
		on:clear={() => (searchingLocation = undefined)}
		on:select
	/>
</Drawer>
