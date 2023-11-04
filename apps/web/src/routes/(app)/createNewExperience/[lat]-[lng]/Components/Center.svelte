<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCard.svelte';
	import IconCheck from '$lib/components/Icons/IconCheck.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { device } from '@app/utils';
	import { Button, Skeleton } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Stretch } from 'svelte-loading-spinners';
	const dispatch = createEventDispatcher<{
		disconnect: undefined;
		connect: { monumentId: string };
	}>();

	export let monumentToConnectPromise: Promise<{ getMonument: MonumentCard }> | undefined;
	export let connectedMonumentId: string | undefined;
	export let cardShown: boolean;
	export let hideDrawer: boolean;
</script>

<ItemsLayout let:id items={[{ title: 'connect to your monument', id: 'connectMonument' }]}>
	{#if id === 'connectMonument'}
		<Row class="gap-2">
			{#await monumentToConnectPromise}
				<Stretch color="black" />
			{:then monumentToConnect}
				{#if monumentToConnect}
					<MonumentCardComponent
						on:dismiss={() => dispatch('disconnect')}
						dismissable
						disableSeeMoreButton
						disableSharing
						minimalized
						monument={monumentToConnect.getMonument}
					>
						{#if connectedMonumentId === monumentToConnect.getMonument._id}
							<Button color="red" on:click={() => dispatch('disconnect')}>disconnect</Button>
							<Row class="absolute right-0 bottom-0 m-3 gap-2 justify-center items-center">
								<Text>connected</Text>
								<Icon class="child:fill-green-500"><IconCheck /></Icon>
							</Row>
						{:else}
							<Button
								color="blue"
								on:click={() =>
									dispatch('connect', { monumentId: monumentToConnect.getMonument._id })}
								>connect</Button
							>
						{/if}
					</MonumentCardComponent>
				{:else}
					<Skeleton class="w-full h-40" />
					<Button on:click={() => (hideDrawer = false)} color="blue">cant find any monument?</Button
					>
				{/if}
			{/await}
			{#if device.recognizeWidth() === 'mobile'}
				<Button on:click={() => (cardShown = false)} color="blue">show the map</Button>
			{/if}
		</Row>
	{/if}
</ItemsLayout>
