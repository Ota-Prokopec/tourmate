<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Drawer from '$lib/components/Common/Drawer.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import ExperienceCard from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import IconTimes from '$lib/components/Icons/IconTimes.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { MonumentCardWithConnectedExperiences, MonumentMarkerData } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import Marker from '../Marker.svelte';
	import MediaQuery from '$lib/components/MediaQueries/MediaQuery.svelte';
	import IconImages from '$lib/components/Icons/IconImages.svelte';
	import Full from '$lib/components/Common/Full.svelte';

	export let monument: MonumentMarkerData;
	export let disableShowingDetails = false;
	let userAlreadyHasExperienceConnectedToThisMonument =
		monument.usersConnectedExperiences.length !== 0;

	export let zoom: number | undefined = undefined;
	export let detailHidden = true;

	$: zoomClass = zoom && zoom > 18 ? 'w-20 h-20' : 'w-14 h-14';

	let monumentCardDataPromise:
		| Promise<{ getMonument: MonumentCardWithConnectedExperiences }>
		| undefined;
	const getMonumentCard = async () => {
		detailHidden = false;
		monumentCardDataPromise = sdk.getMonumentCardWithConnectedExperiences({ id: monument._id });
	};

	let className = '';
	export { className as class };
	export let classDrawer = '';
</script>

<Drawer
	backdrop={true}
	class={twMerge('p-2 h-full w-full max-w-[400px] ', classDrawer)}
	bind:hidden={detailHidden}
	placement="left"
>
	<MediaQuery size="mobile">
		<Right>
			<Icon on:click={() => (detailHidden = true)} class="child:w-10 child:h-10"><IconTimes /></Icon
			>
		</Right>
	</MediaQuery>
	{#if monumentCardDataPromise}
		{#await monumentCardDataPromise}
			<Center class="w-full h-full">
				<Loading />
			</Center>
		{:then monumentCardData}
			{@const monument = monumentCardData.getMonument}
			<Column class={'flex-nowrap'}>
				<MonumentCardComponent class="mb-bottomNavBarHeightSize" size="normal" {monument} />
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
	{#if userAlreadyHasExperienceConnectedToThisMonument}
		<Icon class="child:fill-gray-900 absolute right-0 top-0 p-[2px]">
			<IconImages />
		</Icon>
	{/if}

	<Avatar class={zoomClass} src={monument.pictureURL} />
</Marker>
