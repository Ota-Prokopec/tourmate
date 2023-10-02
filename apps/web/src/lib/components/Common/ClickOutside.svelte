<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ clickOutside: undefined }>();
	const clickOutside = (node: HTMLElement) => {
		const handleClick = (event: MouseEvent) => {
			if (!event.target) throw new Error('event.target is not defined');
			if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
				//@ts-ignore
				//node.dispatchEvent(new CustomEvent('click_outside', node));
				dispatch('clickOutside');
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};
</script>

<div use:clickOutside>
	<slot />
</div>
