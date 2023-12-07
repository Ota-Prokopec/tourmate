<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickoutside } from '@svelteuidev/composables';

	let open = false;

	const dispatch = createEventDispatcher<{ clickOutside: undefined }>();
	$: if (open) dispatch('clickOutside');

	let className = '';
	export { className as class };
</script>

<div class={className} use:clickoutside={{ enabled: open, callback: () => (open = false) }}>
	<slot />
</div>
