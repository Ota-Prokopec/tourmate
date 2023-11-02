<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-auto h-auto flex flex-wrap flex-col gap-4', className)}>
	<slot />
</div>
