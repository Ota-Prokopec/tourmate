<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { Toggle } from 'flowbite-svelte';
	import type { MapSetttings } from './mapSettings';

	export let settingsHidden: boolean;
	export let settings: MapSetttings;
</script>

<Drawer placement="top" bind:hidden={settingsHidden} class="w-full" size={400}>
	<Text class="text-2xl">Settings</Text>
	<Column class="mt-2">
		<Toggle bind:checked={settings.seeExperiences}>see experiences</Toggle>
		<Toggle bind:checked={settings.seeMonuments}>see monuments</Toggle>
	</Column>
</Drawer>
