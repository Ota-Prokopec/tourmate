<script lang="ts">
	import { Img } from 'flowbite-svelte';
	export let src: URL | string | undefined = undefined;

	$: stringSrc = src as string;

	let className = '';
	export { className as class };
</script>

<Img class={className} src={stringSrc} />
