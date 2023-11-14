<script lang="ts">
	import { typewriter } from '@svelteuidev/motion';

	export let speed: number;

	let className = '';
	export { className as class };
</script>

<div class={className} in:typewriter={{ speed: speed }}>
	<slot />
</div>
