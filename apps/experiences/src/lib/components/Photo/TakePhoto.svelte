<script lang="ts">
	import type { Base64 } from '@app/ts-types';
	import { elementIdGenerator, fileToBase64 } from '@app/utils';
	import { createEventDispatcher, onMount } from 'svelte';

	const id = elementIdGenerator();
	onMount(() => {
		const input = document.getElementById(id) as HTMLInputElement;
		input.click();
	});

	const dispatch = createEventDispatcher<{
		image: { base64: string | Base64 };
		error: undefined;
	}>();

	const change = async (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const files = e.currentTarget.files;
		if (!files) {
			dispatch('error');
			throw new Error('user did not take photo');
		}
		const base64 = await fileToBase64(files[0]);
		if (!base64) {
			dispatch('error');
			throw new Error('user did not take photo');
		}
		dispatch('image', { base64: base64 });
	};
</script>

<input class="hidden" {id} on:change={change} type="file" accept="image/*" capture="environment" />
