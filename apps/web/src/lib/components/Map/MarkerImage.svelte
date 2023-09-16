<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import Marker from './Marker.svelte';
	import { Avatar, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let location: Location;
	export let imgSrc: URL;
	export let zoom: number = 14;
	export let stacked = false;

	const avatarURL = imgSrc as unknown as string;

	let className = '';
	export { className as class };
</script>

<Marker {location}>
	<button
		on:click
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
			src={avatarURL}
		>
			<slot name="avatar" />
		</Avatar>
	</button>
	<slot />
</Marker>
