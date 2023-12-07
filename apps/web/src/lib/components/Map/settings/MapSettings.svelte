<script lang="ts">
	import { user } from '$lib/appwrite/appwrite';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconSettings from '$lib/components/Icons/IconSettings.svelte';
	import { alert } from '$src/routes/alertStore';
	import { Button, Input } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ change: { range: number } }>();

	export let settingsHidden: boolean;
	export let mapRangeValue: string;
	export let isLoading = false;

	const save = async () => {
		try {
			isLoading = true;
			await user.addPreferences({ mapRange: parseInt(mapRangeValue) });
		} catch (error) {
			alert(
				'saving map preferences failed',
				'We are sorry, but your map preferences were not saved. Please try it later again.',
				{ color: 'red' }
			);
		}
		isLoading = false;
		dispatch('change', { range: parseInt(mapRangeValue) });
	};
</script>

<Drawer placement="top" bind:hidden={settingsHidden} class="w-full absolute" size={400}>
	<Center>
		<Row class="justify-center items-center gap-1">
			<Text class="text-2xl">Settings</Text>
			<Icon><IconSettings /></Icon>
		</Row>
	</Center>
	<Column class="mt-2">
		<ItemsLayout class="w-full" let:id items={[{ id: 'mapRange', title: 'range of the map' }]}>
			{#if id === 'mapRange'}
				<Input class="w-full max-w-[400px]" type="number" bind:value={mapRangeValue} />
			{/if}
		</ItemsLayout>
		<Right>
			<Button on:click={save} class="w-auto" color="green">
				{#if isLoading}
					<Loading />
				{:else}
					save
				{/if}
			</Button>
		</Right>
	</Column>
</Drawer>
