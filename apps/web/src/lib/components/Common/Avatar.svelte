<script lang="ts">
	import { Avatar } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let size: 'xs' | 'sm' | 'lg' | 'xl' | 'md' | undefined = undefined;
	export let src: URL | string | undefined | null = undefined;
	export let stacked = false;
	export let rounded = false;

	export let isAvatarFirstInStack: boolean | undefined = undefined;

	let className = '';
	export { className as class };

	$: imageString = src as unknown as string | undefined;
</script>

<Avatar
	stacked={!isAvatarFirstInStack && stacked}
	class={twMerge(
		'object-cover ',
		isAvatarFirstInStack && stacked ? 'border-2 border-white' : '',
		className
	)}
	{size}
	src={imageString}
	{rounded}
/>
