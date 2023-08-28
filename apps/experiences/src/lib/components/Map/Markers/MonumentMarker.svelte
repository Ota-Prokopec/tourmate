<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Monument } from '@app/ts-types';
	import Icon from '$lib/components/Common/Icon.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '../Marker.svelte';
	import { goto } from '$app/navigation';
	import type { Models } from '@app/appwrite-server';

	export let monument: Monument & Models.Document;
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
		<Card img={monument.pictureURL} class="mb-4">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{monument.name}
			</h5>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{monument.about}
			</p>
			<Button on:click={() => goto(`/monument/${monument.$id}`)} color="blue"
				>Read more</Button
			>
		</Card>
	</Popover>
</Marker>
