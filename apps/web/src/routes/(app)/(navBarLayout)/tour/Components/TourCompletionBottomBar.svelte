<script lang="ts">
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import ProgressBar from '$lib/components/Common/ProgressBar.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import BubbleIconWrapper from '$lib/components/Icons/BubbleIconWrapper.svelte';
	import IconList from '$lib/components/Icons/IconList.svelte';
	import IconLocationArrow from '$lib/components/Icons/IconLocationArrow.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { normalizeMeters } from '@app/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		showMonumentsList: undefined;
		showAccomplishingCard: undefined;
	}>();

	export let distanceToClosestMonument: number | null;
	export let isTourFinished: boolean;
	export let allMonuments: MonumentCard[];
	export let monumentsToAccomplish: MonumentCard[];
</script>

<Columns
	columns="1fr 3fr 1fr"
	class="absolute bottom-0 w-full h-auto p-2 child:flex child:justify-self-center "
>
	<Icon
		on:click={() => dispatch('showMonumentsList')}
		class="child:w-10 child:h-10 p-2 rounded-full bg-green-400 child:fill-white "
	>
		<IconList />
	</Icon>
	<Row class="gap-2 justify-center w-full">
		{#if distanceToClosestMonument && !isTourFinished}
			<Text class="font-bold  text-center"
				>{`${$LL.page.tour.distanceToNextTargetLabel()} ${normalizeMeters(
					distanceToClosestMonument
				)}`}</Text
			>
		{/if}
		<ProgressBar
			class="w-full"
			progress={allMonuments.length - monumentsToAccomplish.length}
			labelInside
			showWrittenProgress
			max={allMonuments.length}
		/>
	</Row>

	<BubbleIconWrapper on:click={() => dispatch('showAccomplishingCard')} class="">
		<IconLocationArrow />
	</BubbleIconWrapper>
</Columns>
