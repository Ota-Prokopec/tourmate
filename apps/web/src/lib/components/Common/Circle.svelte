<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<div class={twMerge('rounded-full ', className)}>
	<slot />
</div>
