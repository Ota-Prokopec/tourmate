<script lang="ts">
	import { Listgroup, ListgroupItem, SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import IconDrop from '../../Icons/IconDrop.svelte';
	import Icon from '../../Common/Icon.svelte';
	import { device } from '@app/utils';
	import { createEventDispatcher } from 'svelte';
	import type { Filter } from '@app/image-svelte';

	const dispatch = createEventDispatcher<{
		click: Filter;
	}>();
</script>

<SpeedDial
	defaultClass="relative"
	tooltip="none"
	placement="left"
	trigger={device.recognizeWidth() === 'mobile' ? 'click' : 'hover'}
>
	<Icon class="text-3xl" slot="icon">
		<IconDrop />
	</Icon>
	<Listgroup>
		<ListgroupItem class="flex"
			><button on:click={() => dispatch('click', 'blur')} class="w-full h-full text-2xl"
				>blur</button
			></ListgroupItem
		>
		<ListgroupItem class="flex"
			><button on:click={() => dispatch('click', 'grey')} class="w-full h-full text-2xl"
				>grey</button
			></ListgroupItem
		><ListgroupItem class="flex"
			><button on:click={() => dispatch('click', 'median')} class="w-full h-full text-2xl"
				>share</button
			></ListgroupItem
		><ListgroupItem class="flex"
			><button on:click={() => dispatch('click', 'sobel')} class="w-full h-full text-2xl"
				>share</button
			></ListgroupItem
		><ListgroupItem class="flex"
			><button on:click={() => dispatch('click', 'scharr')} class="w-full h-full text-2xl"
				>share</button
			>
		</ListgroupItem>
		<ListgroupItem class="flex"
			><button on:click={() => dispatch('click', 'gaussian')} class="w-full h-full text-2xl"
				>share</button
			></ListgroupItem
		>
	</Listgroup>
</SpeedDial>
