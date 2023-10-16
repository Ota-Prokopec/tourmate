<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let rows = '1fr 1fr';

	let className = '';
	export { className as class };
</script>

<div style={`grid-templete-rows: ${rows}`} class={twMerge('w-auto h-auto grid gap-4', className)}>
	<slot />
</div>
