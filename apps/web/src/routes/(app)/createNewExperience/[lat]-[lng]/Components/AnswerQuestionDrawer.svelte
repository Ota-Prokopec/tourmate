<script lang="ts">
	import { goto } from '$app/navigation';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import LL, { locale } from '$src/i18n/i18n-svelte';
	import { forgetCache } from '@apollo/client/cache/inmemory/reactiveVars';
	import type { MonumentMarkerData } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';

	export let hideDrawer: boolean;
	export let nearMonuments: MonumentMarkerData[];
</script>

<Drawer
	bind:hidden={hideDrawer}
	placement="auto"
	class="!z-50 w-auto max-w-[400px] h-[calc(100%-100px)] fixed top-[100px]"
	size={400}
/>
