<script lang="ts">
	import { goto } from '$app/navigation';
	import CreateNewMonumentButton from '$lib/components/Buttons/CreateNewMonumentButton.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentMarkerData } from '@app/ts-types';

	export let hideDrawer: boolean;
	export let nearMonuments: MonumentMarkerData[];
</script>

<Drawer
	bind:hidden={hideDrawer}
	placement="auto"
	class="!z-50 w-auto max-w-[400px] h-[calc(100%-100px)] fixed top-[100px]"
>
	<Row class="gap-4 justify-center">
		<Text class="text-2xl w-full flex justify-center">
			{#if nearMonuments.length}
				{$LL.component.MonumentNotFoundDrawer.cantFindAnyMonumentQuestion()}
			{:else}
				{$LL.component.MonumentNotFoundDrawer.noMonumentHere()}
			{/if}
		</Text>
		<Text>
			{#if nearMonuments.length}
				{$LL.component.MonumentNotFoundDrawer.createNewOneMessage()}
			{:else}
				{$LL.component.MonumentNotFoundDrawer.noMonumentsHereMessage()}
			{/if}
		</Text>
		<CreateNewMonumentButton on:click={() => goto('/addMonument')} />
	</Row>
</Drawer>
