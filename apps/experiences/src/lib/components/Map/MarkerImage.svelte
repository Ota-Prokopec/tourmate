<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import Marker from './Marker.svelte';
	import { Avatar, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import IconFullSize from '../Icons/IconMaximize.svelte';
	import Icon from '../Common/Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	export let location: Location;
	export let imgSrc: string | Base64;
	export let zoom: number;
	export let hovered: boolean = false;
	const dispatch = createEventDispatcher<{ fullScreen: { imgSrc: string | Base64 } }>();

	export let stacked = false;
	export let offset: [number, number] = [0, 0];

	let className = '';
	export { className as class };

	const onHoverStart = () => (hovered = zoom > 17);
	const onHoverEnd = () => (hovered = false);
</script>

<Marker {offset} {location}>
	<button
		on:click={() => dispatch('fullScreen', { imgSrc: imgSrc })}
		class={twMerge(
			'w-12 h-12 ',
			zoom > 17
				? 'w-16 h-16 hover:w-64 hover:z-[99999] hover:h-auto hover:rounded-2xl group-hover:rounded-2xl'
				: '',
			zoom > 19 ? 'w-40 h-40' : ''
		)}
	>
		<Avatar
			{stacked}
			class={twMerge(
				'rounded-full object-cover w-full h-full group',
				zoom > 17 ? 'rounded-2xl  h-auto' : '',
				className
			)}
			rounded
			src={imgSrc}
		/>
	</button>
</Marker>
