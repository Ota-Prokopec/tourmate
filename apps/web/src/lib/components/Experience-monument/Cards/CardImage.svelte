<script lang="ts">
	import Img from '$lib/components/Common/Img.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ like: undefined }>();

	export let imgSrc: string | URL | null | undefined;
</script>

{#if imgSrc}
	<button
		class="h-auto w-full relative"
		on:dblclick={() => {
			dispatch('like');
		}}
	>
		<Img class="rounded-lg object-cover w-full" src={imgSrc} />
		<slot />
	</button>
{/if}
