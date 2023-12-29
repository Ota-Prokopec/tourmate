<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import lsStore from '$lib/utils/lsStore';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { distanceTo } from '@app/utils';
	import { Button, Skeleton } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Stretch } from 'svelte-loading-spinners';

	const dispatch = createEventDispatcher<{
		disconnect: undefined;
		connect: { monumentId: string; distanceInMeters: number };
	}>();

	export let monumentToConnectPromise: Promise<{ getMonument: MonumentCard }> | undefined;

	export let cardShown: boolean;
	export let hiddenCantFindMonumentDrawer: boolean;
	$: usersLocation = $lsStore.usersLocation;

	$: monumentToConnectPromise?.then((monument) => {
		if (!usersLocation) throw new Error('usersLocation is not defined in ls store');

		const distanceInMeters = distanceTo(usersLocation, monument.getMonument.location);

		dispatch('connect', {
			monumentId: monument.getMonument._id,
			distanceInMeters: distanceInMeters
		});
	});

	//TODO: create translation for connection the picture to the monument
</script>

<ItemsLayout
	class="mt-4 h-auto "
	let:id
	items={[
		{
			title: $LL.page.createNewExperience.Center.connectExperienceToMonument(),
			id: 'connectMonument'
		}
	]}
>
	{#if id === 'connectMonument'}
		<Column class="justify-start">
			{#await monumentToConnectPromise}
				<Stretch color="black" />
			{:then monumentToConnect}
				{#if monumentToConnect}
					<MonumentCardComponent
						on:dismiss={() => dispatch('disconnect')}
						dismissable
						disableSeeMoreButton
						disableSharing
						size="normal"
						monument={monumentToConnect.getMonument}
					/>
				{:else}
					<Skeleton class="w-full h-40" />
					<Right>
						<Column class="gap-1">
							<Button on:click={() => (hiddenCantFindMonumentDrawer = false)} color="blue"
								>{$LL.page.createNewExperience.Center.cantFindAnyMonumentQuestion()}</Button
							>
							<MediaQuery class="mt-4" size="mobile">
								<Button color="blue" on:click={() => (cardShown = false)}>
									{$LL.page.createNewExperience.Center.chooseMonumentFromMap()}
								</Button>
							</MediaQuery>
						</Column>
					</Right>
				{/if}
			{/await}
		</Column>
	{/if}
</ItemsLayout>
