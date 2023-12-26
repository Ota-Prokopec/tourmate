<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import type { Location, Topic, Transport } from '@app/ts-types';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import TransportType from '$lib/components/Experience-monument/transportType/TransportType.svelte';
	import TopicComponent from '$lib/components/Experience-monument/topic/Topic.svelte';
	import TextArea from '$lib/components/Common/TextArea.svelte';
	import Card from '$lib/components/Common/Card.svelte';
	import { twMerge } from 'tailwind-merge';
	import LL from '$src/i18n/i18n-svelte';
	import Text from '$lib/components/Common/Text.svelte';

	export let placeName: string;
	export let location: Location;
	export let name: string;
	export let about: string;
	export let topics: Topic[];

	export let transports: Transport[];
	export let aboutLimit: number = 400;

	let className = '';
	export { className as class };
</script>

<Card
	class={twMerge(
		'w-full h-min m-4 sm:absolute sm:left-0 z-10 p-2 flex flex-wrap flex-col gap-4',
		className
	)}
>
	<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
	<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
		{placeName}
	</h5>
	<Text class="mb-3 font-normal text-gray-500 dark:text-gray-400 break-all">
		lokace: [{location}]
	</Text>
	<ItemsLayout
		let:id
		items={[
			{ title: $LL.name(), id: 'name' },
			{ title: $LL.place(), id: 'place' },
			{ title: $LL.type(), id: 'type' },
			{ title: $LL.transport(), id: 'transport' },
			{ title: $LL.about(), id: 'about' },
			{ title: $LL.image(), id: 'image' }
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
