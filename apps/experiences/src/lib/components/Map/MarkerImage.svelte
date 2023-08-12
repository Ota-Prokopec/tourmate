<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import Marker from './Marker.svelte';
	import { Avatar, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ almostProfile: { imgSrc: string | Base64 } }>();

	export let location: Location;
	export let imgSrc: string | Base64;
	export let zoom: number = 14;
	export let hovered: boolean = false;
	export let stacked = false;

	let className = '';
	export { className as class };

	const onHoverStart = () => (hovered = zoom > 17);
	const onHoverEnd = () => (hovered = false);
</script>

<Marker {location}>
	<button
		on:click={() => dispatch('almostProfile', { imgSrc: imgSrc })}
		class={twMerge(
			'w-12 h-12 ',
			zoom > 17 ? 'h-14 w-14 hover:z-[99999] hover:w-16 hover:h-16' : '',
			zoom > 19 ? '' : ''
		)}
	>
		<Avatar
			{stacked}
			class={twMerge(
				'rounded-full object-cover w-full h-full group',
				zoom > 17 ? '' : '',
				className
			)}
			rounded
			src={imgSrc}
		/>
	</button>
</Marker>
