<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import MonumentsSearch from '$lib/components/Search/MonumentsSearch.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';

	export let hidden = true;
	export let chosen: MonumentCard[] = [];

	export let searchingText: string = '';

	const cardClick = (monument: MonumentCard) => {
		const contains = chosen.find((item) => item._id === monument._id);
		if (contains) chosen = chosen.filter((item) => item._id !== monument._id);
		else chosen = [...chosen, monument];
	};
</script>

<Drawer
	bind:hidden
	placement="auto"
	class="z-50 fixed top-0 right-0 w-[500px] mobile:w-full mobile:h-[calc(100% - 60px)] mobile:top-[60px]"
>
	<Column class="gap-6">
		<SearchInput bind:value={searchingText} />
		<MonumentsSearch let:monument limit={2} {searchingText}>
			{@const isMonumentChosen = chosen.find((item) => item._id === monument._id) ? true : false}
			<MonumentCardComponent
				disablePlaceLink={true}
				disableOwnerOptions
				disableSeeMoreButton
				disableSharing
				class={isMonumentChosen ? 'border-[3px] border-orange-500' : ''}
				on:click={() => {
					cardClick(monument);
				}}
				size="tiny"
				{monument}
			/>
			<svelte:fragment slot="loading">
				<MonumentCardSkeleton size="tiny" />
				<MonumentCardSkeleton size="tiny" />
				<MonumentCardSkeleton size="tiny" />
			</svelte:fragment>
		</MonumentsSearch>
	</Column>
</Drawer>
