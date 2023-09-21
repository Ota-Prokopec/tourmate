<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import MarkerImage from '../MarkerImage.svelte';
	import type { Base64, Experience, GraphqlDocument } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ almostProfile: { imgSrc: URL } }>();

	export let experience: GraphqlDocument<Experience>;
	export let zoom: number = 14;
	export let stacked = false;
	export let bouncing = false;

	let className = '';
	export { className as class };
</script>

<MarkerImage
	on:click={() => dispatch('almostProfile', { imgSrc: experience.imgSrc })}
	class={twMerge('rounded-full', bouncing && 'animate-bounce', className)}
	{stacked}
	on:almostProfile
	{zoom}
	imgSrc={experience.imgSrc}
	location={experience.location}
/>
