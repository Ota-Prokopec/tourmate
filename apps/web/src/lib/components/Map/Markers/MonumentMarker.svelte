<script lang="ts">
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import IconCheck from '$lib/components/Icons/IconCheck.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { MonumentCard, TMonumentMarkerData } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import Marker from '../Marker.svelte';

	export let monumentMarkerData: TMonumentMarkerData;
	export let disableShowingDetails = false;

	export let zoom: number | undefined = undefined;
	export let detailHidden = true;

	$: zoomClass = zoom && zoom > 18 ? 'w-20 h-20' : 'w-14 h-14';

	let monumentCardDataPromise: Promise<{ getMonument: MonumentCard }> | undefined;
	const getMonumentCard = async () => {
		detailHidden = false;
		monumentCardDataPromise = sdk.getMonumentCard({ id: monumentMarkerData._id });
	};

	let className = '';
	export { className as class };
	export let classDrawer = '';
</script>

<Drawer
	backdrop={true}
	class={twMerge('p-2 h-full w-full sm:max-w-[400px] ', classDrawer)}
	bind:hidden={detailHidden}
	placement="left"
>
	{#if monumentCardDataPromise}
		{#await monumentCardDataPromise}
			<Center class="w-full h-full">
				<Loading />
			</Center>
		{:then monumentCardData}
			{@const monument = monumentCardData.getMonument}
			<Column class={'flex-nowrap'}>
				<MonumentCardComponent
					disableOwnerOptions
					class="mb-bottomNavBarHeightSize"
					size="normal"
					{monument}
				/>
			</Column>
		{/await}
	{/if}
</Drawer>

<Marker
	on:click={() => {
		if (!disableShowingDetails) getMonumentCard();
	}}
	on:click
	class={twMerge('bg-inherit', className)}
	location={monumentMarkerData.location}
>
	{#if monumentMarkerData.usersMonumentCompletion}
		<Icon class="child:fill-green-400 absolute right-0 top-0 p-[2px]">
			<IconCheck />
		</Icon>
	{/if}

	<Avatar class={zoomClass} src={monumentMarkerData.pictureURL} />
</Marker>
