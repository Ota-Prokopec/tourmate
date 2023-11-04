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

	export let monument: GraphqlDocument<Monument>;

	export let bouncing = false;
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

<Drawer class="p-0" bind:hidden={detailHidden} placement="left" size={400}>
	{#if monumentCardDataPromise}
		{#await monumentCardDataPromise}
			<Stretch color="black" />
		{:then monumentCardData}
			{@const monument = monumentCardData.getMonument}
			<MonumentCardComponent {monument} />
			<Carousel>
				{#each monument.connectedExperiences as experience}
					<ExperienceCard disableReRouting {experience} />
				{/each}
			</Carousel>
		{/await}
	{/if}
</Drawer>

<Marker
	on:click={getMonumentCard}
	class={twMerge('bg-inherit' /*bouncing && 'animate-bouncing'*/, className)}
	location={monument.location}
>
	<Avatar class={zoomClass} src={monument.pictureURL} />
</Marker>
