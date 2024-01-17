<script lang="ts">
	import { Circle3 } from 'svelte-loading-spinners';

	export let type: 'basic' | 'circle3' = 'basic';

	let className = 'text-blue-600';
	export { className as class };
</script>

{#if type === 'basic'}
	<div
		class="{className} animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full"
		role="status"
		aria-label="loading"
	>
		<span class="sr-only">Loading...</span>
	</div>
{:else if type === 'circle3'}
	<Circle3 />
{/if}
