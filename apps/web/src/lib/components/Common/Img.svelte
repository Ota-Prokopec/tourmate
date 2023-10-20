<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { isString } from 'lodash';
	export let src: URL | string;

	$: stringSrc = src as string;

	let className = '';
	export { className as class };
</script>

<Img class={className} src={stringSrc} />
