<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import MarkerImage from '../MarkerImage.svelte';
	import type { Base64, Experience } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ almostProfile: { imgSrc: string | Base64 } }>();

	export let experience: Experience;
	let zoom: number = 14;
	export let stacked = false;
	export let bouncing = false;

	let className = '';
	export { className as class };
</script>

<MarkerImage
	on:click={() => dispatch('almostProfile', { imgSrc: experience.imgSrc })}
	class={twMerge(bouncing && 'animate-bounce', className)}
	{stacked}
	on:almostProfile
	{zoom}
	imgSrc={experience.imgSrc}
	location={experience.location}
/>
