<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type {
		GraphqlDocument,
		Monument,
		MonumentCardWithConnectedExperiences,
		MonumentMarkerData
	} from '@app/ts-types';
	import Marker from '../Marker.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import { sdk } from '$src/graphql/sdk';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import ExperienceCard from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import MediaQueryMobile from '$lib/components/MediaQueries/MediaQueryMobile.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import Right from '$lib/components/Common/Right.svelte';

	export let monument: MonumentMarkerData;
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

<Drawer
	class="p-2 h-full w-full max-w-[400px]"
	bind:hidden={detailHidden}
	placement="left"
	size={600}
>
	<MediaQueryMobile>
		<Right>
			<Icon on:click={() => (detailHidden = true)} class="child:w-7 child:h-7"><IconTimes /></Icon>
		</Right>
	</MediaQueryMobile>
	{#if monumentCardDataPromise}
		{#await monumentCardDataPromise}
			<Center class="w-full h-full">
				<Loading />
			</Center>
		{:then monumentCardData}
			{@const monument = monumentCardData.getMonument}
			<Column class="gap-4">
				<MonumentCardComponent size="normal" {monument} />
				{#if monument.connectedExperiences.length}
					<Carousel class="h-min" swiping arrows>
						{#each monument.connectedExperiences as experienceWithoutConnectedMonument}
							{@const experience = {
								...experienceWithoutConnectedMonument,
								connectedMonument: monument
							}}
							<ExperienceCard class="p-0 self-center shadow-none" {experience} />
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
