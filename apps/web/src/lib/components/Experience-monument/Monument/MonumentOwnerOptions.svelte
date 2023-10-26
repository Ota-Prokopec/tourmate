<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconOptions from '$lib/components/Icons/IconOptions.svelte';
	import { Listgroup, ListgroupItem, SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import { TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ delete: undefined; edit: undefined }>();
</script>

<SpeedDial defaultClass="right-24 bottom-6" tooltip="none">
	<Icon class="p-0 m-0" slot="icon">
		<IconOptions class="h-7 w-7 !p-0 !m-0" />
	</Icon>

	<Listgroup class="divide-none">
		<ListgroupItem class="flex gap-2 md:px-5">
			<TrashBinOutline on:click={() => dispatch('delete')} class="w-5 h-5 cursor-pointer" />
		</ListgroupItem>
		<ListgroupItem class="flex gap-2 md:px-5">
			<EditOutline on:click={() => dispatch('edit')} class="w-5 h-5 cursor-pointer" />
		</ListgroupItem>
	</Listgroup>
</SpeedDial>
