<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<div class={twMerge('w-auto h-auto flex items-center justify-center', className)}>
	<slot />
</div>
