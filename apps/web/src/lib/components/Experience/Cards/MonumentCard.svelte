<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import type { Monument } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let monument: Monument;

	let className = '';
	export { className as class };

	$: imgSrcAsString = monument.pictureURL as unknown as string | undefined;
</script>

<Card class={twMerge(' justify-self-center', className)}>
	<Icon icon="fas fa-map-marker-alt" class="text-3xl text-red-500" />
	<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
		{monument.name}
	</h5>
	<p class="mb-3 font-normal text-gray-500 dark:text-gray-400 flex flex-wrap flex-col gap-2">
		<span>lokace: [{monument.location}]</span>
	</p>
	<Img class="rounded-lg object-cover " src={imgSrcAsString} />
</Card>
