<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let columns = '1fr 1fr';

	let className = '';
	export { className as class };
</script>

<button
	on:click
	style={`grid-template-columns: ${columns}`}
	class={twMerge('w-auto h-auto grid gap-4', className)}
>
	<slot />
</button>
