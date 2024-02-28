<script lang="ts">
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import SearchMonuments from '../../search/Components/SearchMonuments.svelte';
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
	<SearchInput bind:value={searchingText} />
	<SearchMonuments let:monument limit={2} {searchingText}>
		{@const isMonumentChosen = chosen.find((item) => item._id === monument._id) ? true : false}
		<MonumentCardComponent
			disablePlaceLink={true}
			disableOwnerOptions
			disableSeeMoreButton
			disableSharing
			class={isMonumentChosen ? 'border-2 border-blue-300' : ''}
			on:click={() => {
				cardClick(monument);
			}}
			size="tiny"
			{monument}
		/>
	</SearchMonuments>
</Drawer>
