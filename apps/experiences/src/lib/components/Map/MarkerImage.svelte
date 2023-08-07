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

	let button: HTMLButtonElement | null;

	let className = '';
	export { className as class };

	const onHoverStart = () => (hovered = zoom > 17);
	const onHoverEnd = () => (hovered = false);
</script>

<Marker {location}>
	<button
		on:mouseover={onHoverStart}
		on:mouseout={onHoverEnd}
		on:blur={onHoverEnd}
		on:touchstart={onHoverStart}
		class={twMerge(
			'w-12 h-12 ',
			zoom > 17
				? 'w-16 h-16 hover:w-40 hover:h-auto hover:rounded-2xl group-hover:rounded-2xl'
				: ''
		)}
		bind:this={button}
	>
		<Avatar
			class={twMerge(
				'rounded-full object-cover w-full h-full group',
				zoom > 17 ? 'rounded-2xl  h-auto' : '',
				className
			)}
			rounded
			border
			src={imgSrc}
		/>
		{#if hovered}
			<Icon
				on:mouseover={onHoverStart}
				on:mouseout={onHoverEnd}
				on:touchstart={onHoverStart}
				on:click={() => dispatch('fullScreen', { imgSrc })}
				class="absolute bottom-0 right-0 m-4 "
			>
				<IconFullSize class="w-5 h-5 " />
			</Icon>
		{/if}
	</button>
</Marker>
