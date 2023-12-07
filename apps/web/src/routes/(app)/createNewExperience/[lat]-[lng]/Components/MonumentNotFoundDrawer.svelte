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
>
	<Row class="gap-4 justify-center">
		<Right>
			<Icon on:click={() => (hideDrawer = true)} class="child:w-10 child:h-10">
				<IconTimes />
			</Icon>
		</Right>
		<Text class="text-2xl w-full flex justify-center">
			{#if nearMonuments.length}
				{$LL.cantFindAnyMonumentQuestion()}
			{:else}
				Ajjj, no monument here
			{/if}
		</Text>
		<Text>
			{#if nearMonuments.length}
				{#if $locale === 'en'}
					If you cant choose from monuments that are screen on map you can create.
				{:else if $locale === 'cs'}
					Jestli nemůžete najít žádný zážitek, který byste připojili ke své forgetCache, můžete si
					nový zážitek sám vytvořit.
				{/if}
			{:else if $locale === 'en'}
				You are in the area where are no monuments you could connect, you will have to wait till
				someone will create a new monument in your area or you can create your own monument.
			{:else if $locale === 'cs'}
				Jste v oblasti kde nejsou žádné zážitky, buď budete muset počkat než někdo vytvoří nějaký
				zážitek v této oblasti nebo si ho můžete vytvořit sám.
			{/if}
		</Text>
		<Button on:click={() => goto('/addMonument')} color="blue">Create new monument</Button>
	</Row>
</Drawer>
