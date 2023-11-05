<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import type { Location, Topic, Transport } from '@app/ts-types';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import TransportType from '$lib/components/Experience-monument/transportType/TransportType.svelte';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import TextArea from '$lib/components/Common/TextArea.svelte';
	import Card from '$lib/components/Common/Card.svelte';

	export let placeName: string;
	export let location: Location;
	export let name: string;
	export let about: string;
	export let topics: Topic[];

	export let transports: Transport[];
	export let aboutLimit: number = 400;
</script>

<Card class="w-full h-min m-4 sm:absolute sm:left-0 z-50">
	<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
	<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
		{placeName}
	</h5>
	<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
		lokace: [{location}]
	</p>
	<ItemsLayout
		let:id
		items={[
			{ title: 'Name', id: 'name' },
			{ title: 'place', id: 'place' },
			{ title: 'typ', id: 'type' },
			{ title: 'transport', id: 'transport' },
			{ title: 'about', id: 'about' },
			{ title: 'image', id: 'image' }
		]}
	>
		{#if id === 'name'}
			<Input
				bind:value={name}
				floatingLabel="name of monument"
				class=" "
				classWrap="w-full max-w-[400px]"
			/>
		{:else if id === 'place'}
			<Input
				bind:value={placeName}
				floatingLabel="umístění"
				class=" "
				classWrap="w-full max-w-[400px]"
			/>
		{:else if id === 'type'}
			<TopicComponent bind:chosenTopics={topics} class="mt-2" />
		{:else if id === 'transport'}
			<TransportType bind:chosenTransports={transports} />
		{:else if id === 'about'}
			<TextArea
				bind:value={about}
				letterCount
				maxLength={aboutLimit}
				class="h-auto min-h-[200px]"
				classWrap="w-full max-w-[400px]  "
			/>
		{:else if id === 'image'}
			<slot name="image" />
		{/if}
	</ItemsLayout>
	<slot />
</Card>
