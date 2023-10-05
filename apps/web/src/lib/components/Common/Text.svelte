<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<span class={twMerge('break-words', className)}>
	<slot />
</span>
