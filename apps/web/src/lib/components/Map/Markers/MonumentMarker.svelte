<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { urlToString, type Document, type GraphqlDocument, type Monument } from '@app/ts-types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '../Marker.svelte';
	import { goto } from '$app/navigation';

	export let monument: GraphqlDocument<Monument>;
	export let bouncing = false;

	let className = '';
	export { className as class };
</script>

<Marker
	class={twMerge('bg-inherit' /*bouncing && 'animate-bouncing'*/, className)}
	location={monument.location}
>
	<Icon icon="fas fa-map-marker-alt" class="text-4xl text-red-500" />
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