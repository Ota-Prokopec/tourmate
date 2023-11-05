<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type {
		MonumentCard,
		GraphqlDocument,
		Monument,
		MonumentCardWithConnectedExperiences
	} from '@app/ts-types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '../Marker.svelte';
	import { goto } from '$app/navigation';
	import { urlToString } from '@app/utils';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import { sdk } from '$src/graphql/sdk';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCard.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { Stretch } from 'svelte-loading-spinners';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import ExperienceCard from '$lib/components/Experience-monument/Cards/experience/ExperienceCard.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Center from '$lib/components/Common/Center.svelte';

	export let monument: GraphqlDocument<Monument>;
	export let disableShowingDetails = false;

	export let zoom: number | undefined = undefined;
	export let detailHidden = true;

	let className = '';
	export { className as class };

	$: zoomClass = zoom && zoom > 18 ? 'w-20 h-20' : 'w-14 h-14';

	let monumentCardDataPromise:
		| Promise<{ getMonument: MonumentCardWithConnectedExperiences }>
		| undefined;
	const getMonumentCard = async () => {
		detailHidden = false;
		monumentCardDataPromise = sdk.getMonumentCardWithConnectedExperiences({ id: monument._id });
	};
</script>

<Drawer class="p-2 h-full" bind:hidden={detailHidden} placement="left" size={600}>
	{#if monumentCardDataPromise}
		{#await monumentCardDataPromise}
			<Center class="w-full h-full">
				<Loading />
			</Center>
		{:then monumentCardData}
			{@const monument = monumentCardData.getMonument}
			<Column class="gap-4">
				<MonumentCardComponent {monument} />
				{#if monument.connectedExperiences.length}
					<Carousel class="h-min" swiping arrows>
						{#each monument.connectedExperiences as experience}
							<ExperienceCard
								disableSeeMoreButton
								minimalized
								class="p-0 self-center shadow-none"
								disableReRouting
								{experience}
							/>
						{/each}
					</Carousel>
				{/if}
			</Column>
		{/await}
	{/if}
</Drawer>

<Marker
	on:click={() => {
		if (!disableShowingDetails) getMonumentCard();
	}}
	on:click
	class={twMerge('bg-inherit' /*bouncing && 'animate-bouncing'*/, className)}
	location={monument.location}
>
	<Avatar class={zoomClass} src={monument.pictureURL} />
</Marker>
