<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-full h-auto flex flex-wrap flex-row gap-4 p-4', className)}>
	<slot />
</div>
