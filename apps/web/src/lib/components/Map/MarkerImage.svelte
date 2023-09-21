<script lang="ts">
	import type { Base64, Location } from '@app/ts-types';
	import Marker from './Marker.svelte';
	import { Avatar, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let location: Location;
	export let imgSrc: URL;
	export let zoom: number = 14;
	export let stacked = false;

	$: console.log(zoom);

	const avatarURL = imgSrc as unknown as string;

	let className = '';
	export { className as class };

	let size: string = 'w-12 h-12';
	$: size = zoom > 18 ? 'w-20 h-20' : zoom > 10 ? 'w-12 h-12' : 'h-8 w-8';
</script>

<Marker {location}>
	<button on:click class={twMerge(size, className)}>
		<img class={twMerge(size, className)} alt="" src={avatarURL} />
	</button>
	<slot />
</Marker>
