<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconOptions from '$lib/components/Icons/IconOptions.svelte';
	import { Listgroup, ListgroupItem, SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
</script>

<SpeedDial defaultClass="right-24 bottom-6" tooltip="none">
	<Icon slot="icon">
		<IconOptions class="h-7 w-7" />
	</Icon>

	<Listgroup class="divide-none">
		<ListgroupItem class="flex gap-2 md:px-5">
			<TrashBinOutline class="w-5 h-5" />
		</ListgroupItem>
	</Listgroup>
</SpeedDial>
