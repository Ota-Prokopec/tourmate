<script lang="ts">
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import Column from '$lib/components/Common/Column.svelte';
	import NoContent from '$lib/components/Common/NoContent.svelte';

	export let hidden = true;
	export let chosen: MonumentCard[] = [];
	export let disableEditing = false;

	const cardClick = (monument: MonumentCard) => {
		chosen = chosen.filter((item) => item._id !== monument._id);
	};
</script>

<Drawer
	bind:hidden
	placement="auto"
	class="z-50 fixed top-0 right-0 w-[500px] mobile:w-full mobile:h-[calc(100% - 60px)] mobile:top-[60px]"
>
	{#if chosen.length}
		<Column>
			{#each chosen as monument}
				<MonumentCardComponent
					disableAccountLink
					disablePlaceLink={true}
					disableOwnerOptions
					disableSeeMoreButton
					disableSharing
					class={!disableEditing ? 'border-[3px] border-orange-500' : ''}
					on:click={() => {
						if (!disableEditing) cardClick(monument);
					}}
					size="tiny"
					{monument}
				>
					<slot item={1} {monument} />
				</MonumentCardComponent>
			{/each}
		</Column>
	{:else}
		<NoContent />
	{/if}
</Drawer>
