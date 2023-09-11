<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	export let size: 'xs' | 'sm' | 'lg' | 'xl' | 'md' | undefined = undefined;
	export let src: URL | string | undefined | null = undefined;
	export let stacked = false;
	export let rounded = false;

	let className = '';
	export { className as class };

	let imageString = src as unknown as string | undefined;
</script>

<Avatar class={className} {size} src={imageString} {stacked} {rounded}><slot /></Avatar>
