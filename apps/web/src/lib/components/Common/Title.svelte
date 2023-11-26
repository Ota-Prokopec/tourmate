<script lang="ts">
	import Text from './Text.svelte';

	let className = '';
	export { className as class };
</script>

<Text class={'text-4xl text-center ' + className}>
	<slot />
</Text>
