<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		image: File;
	}>();

	const load = (e: HTMLInputElement) => {
		e.click();
	};

	const getImage = async (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (!e.currentTarget.files) throw new Error('e.currentTarget.files is not defined');
		if (!e.currentTarget.files.length) {
			throw new Error('User did not choose');
		}

		const file = e.currentTarget.files[0];
		if (!file) throw new Error('file not found');
		dispatch('image', file);
	};
</script>

<input
	on:change={getImage}
	use:load
	on:cancel
	class="hidden"
	type="file"
	accept="image/*"
	capture="environment"
/>
