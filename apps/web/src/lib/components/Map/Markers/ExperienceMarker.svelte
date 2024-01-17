<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import MarkerImage from '../MarkerImage.svelte';
	import type { ExperienceMarkerData } from '@app/ts-types';

	export let experience: ExperienceMarkerData;
	export let zoom: number = 14;
	export let stacked = false;
	export let bouncing = false;

	let className = '';
	export { className as class };
</script>

<MarkerImage
	class={twMerge('rounded-full', bouncing && 'animate-bounce', className)}
	{stacked}
	on:almostProfile
	{zoom}
	imgSrc={experience.user.profilePictureURL}
	location={experience.location}
/>
