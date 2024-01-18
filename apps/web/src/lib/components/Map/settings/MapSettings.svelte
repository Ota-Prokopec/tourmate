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
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { Button, Input } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ change: { range: number } }>();

	export let settingsHidden: boolean;
	export let mapRangeValue: string;
	export let mapMaxRange = 2_147_483_000; //40km
	export let isLoading = false;

	const save = async () => {
		try {
			isLoading = true;
			//checking the value
			const mapRange = parseInt(mapRangeValue);
			if (mapRange > mapMaxRange) {
				alert('', $LL.component.MapSettings.exceededMaxRange(), { color: 'red' });
				return;
			}
			await user.addPreferences({ mapRange: mapRange });
		} catch (error) {
			isLoading = false;
			alert('', $LL.component.MapSettings.saveErrorMessage(), { color: 'red' });
		}
		isLoading = false;
		dispatch('change', { range: parseInt(mapRangeValue) });
	};
</script>

<Drawer placement="top" bind:hidden={settingsHidden} class="w-full absolute">
	<Center>
		<Row class="justify-center items-center gap-1">
			<Text class="text-2xl">{$LL.common.settings()}</Text>
			<Icon><IconSettings /></Icon>
		</Row>
	</Center>
	<Column class="mt-2">
		<ItemsLayout
			class="w-full"
			let:id
			items={[{ id: 'mapRange', title: $LL.component.MapSettings.mapRange() }]}
		>
			{#if id === 'mapRange'}
				<Input class="w-full max-w-[400px]" type="number" bind:value={mapRangeValue} />
			{/if}
		</ItemsLayout>
		<Right>
			<Button on:click={save} class="w-auto" color="green">
				{#if isLoading}
					<Loading />
				{:else}
					{$LL.common.save()}
				{/if}
			</Button>
		</Right>
	</Column>
</Drawer>
