<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher<{ zoomIn: undefined; zoomOut: undefined }>();

	const evCache: { pointerId: string | number; clientX: number }[] = [];

	let wrapper: HTMLElement | undefined;

	onMount(() => {
		init();
	});
	let prevDiff = -1;

	function init() {
		if (!wrapper) throw new Error('wrapper is not defined');
		wrapper.onpointerdown = pointerdownHandler;
		wrapper.onpointermove = pointermoveHandler;

		wrapper.onpointerup = pointerupHandler;
		wrapper.onpointercancel = pointerupHandler;
		wrapper.onpointerout = pointerupHandler;
		wrapper.onpointerleave = pointerupHandler;
	}

	function pointerdownHandler(ev) {
		evCache.push(ev);
	}

	function pointermoveHandler(ev) {
		// Find this event in the cache and update its record with this event
		const index = evCache.findIndex((cachedEv) => cachedEv.pointerId === ev.pointerId);
		evCache[index] = ev;

		if (evCache.length === 2) {
			const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

			if (prevDiff > 0) {
				if (curDiff > prevDiff) {
					dispatch('zoomIn');
				}
				if (curDiff < prevDiff) {
					dispatch('zoomOut');
				}
			}

			// Cache the distance for the next move event
			prevDiff = curDiff;
		}
	}

	function pointerupHandler(ev) {
		removeEvent(ev);

		if (evCache.length < 2) {
			prevDiff = -1;
		}
	}

	function removeEvent(ev) {
		const index = evCache.findIndex((cachedEv) => cachedEv.pointerId === ev.pointerId);
		evCache.splice(index, 1);
	}

	let className = '';
	export { className as class };
</script>

<div class={className} bind:this={wrapper}>
	<slot />
</div>
