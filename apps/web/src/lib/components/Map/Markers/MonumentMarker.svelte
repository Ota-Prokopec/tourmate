<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { type Document, type GraphqlDocument, type Monument } from '@app/ts-types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '../Marker.svelte';
	import { goto } from '$app/navigation';
	import { urlToString } from '@app/utils';
	import Avatar from '$lib/components/Common/Avatar.svelte';

	export let monument: GraphqlDocument<Monument>;
	export let monuments: GraphqlDocument<Monument>[] | undefined = undefined;

	const monumentsWithSameLocation = monuments
		?.map((m) => (Math.floor(m.location[0] * 1) === Math.floor(m.location[1] * 1) ? m : null))
		.filter(Boolean);

	console.log(monumentsWithSameLocation);

	export let bouncing = false;
	export let zoom: number | undefined = undefined;

	let className = '';
	export { className as class };

	$: zoomClass = zoom && zoom > 18 ? 'w-20 h-20' : 'w-14 h-14';
</script>

<Marker
	class={twMerge('bg-inherit' /*bouncing && 'animate-bouncing'*/, className)}
	location={monument.location}
>
	<Avatar class={zoomClass} src={monument.pictureURL} />
	<Popover class="w-max" placement="top" open={bouncing}>
		<Card img={urlToString(monument.pictureURL)} class="mb-4">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{monument.name}
			</h5>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{monument.about}
			</p>
			<Button on:click={() => goto(`/monument/${monument._id}`)} color="blue">Read more</Button>
		</Card>
	</Popover>
</Marker>
