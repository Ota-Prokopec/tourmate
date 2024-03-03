<script lang="ts">
	import SaveButton from '$lib/components/Buttons/SaveButton.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import Left from '$lib/components/Common/Left.svelte';
	import NoContent from '$lib/components/Common/NoContent.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import IconArrowBack from '$lib/components/Icons/IconArrowBack.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{
		save: { tourName: string; monuments: MonumentCard[] };
	}>();

	export let hidden = true;
	export let chosen: MonumentCard[] = [];
	export let tourName = '';
	export let isSaving = false;

	const cardClick = (monument: MonumentCard) => {
		chosen = chosen.filter((item) => item._id !== monument._id);
	};
</script>

<Drawer
	disableClosing
	bind:hidden
	placement="right"
	class="z-50 absolute top-0 right-0 w-[500px] mobile:w-full gap-2 h-auto"
>
	<Column>
		<MediaQuery size="mobile">
			<Left class="h-auto w-full">
				<Icon on:click={() => (hidden = true)} class="child:w-10 child:h-10">
					<IconArrowBack />
				</Icon>
			</Left>
		</MediaQuery>

		<Input
			bind:value={tourName}
			class="w-full"
			floatingLabel={$LL.component.CheckpointsSaveDrawer.nameInput.label()}
		/>

		{#if chosen.length}
			<Column class="h-auto">
				{#each chosen as monument}
					<MonumentCardComponent
						disablePlaceLink={true}
						disableOwnerOptions
						disableSeeMoreButton
						disableSharing
						class={'border-[3px] border-orange-500'}
						on:click={() => {
							cardClick(monument);
						}}
						size="tiny"
						{monument}
					/>
				{/each}
			</Column>
		{:else}
			<NoContent />
		{/if}
		<Right>
			<SaveButton
				bind:isLoading={isSaving}
				on:click={() => dispatch('save', { tourName: tourName, monuments: chosen })}
			/>
		</Right>
	</Column>
</Drawer>
