<script lang="ts">
	import Img from '$lib/components/Common/Img.svelte';
	import type { MonumentLikeGraphqlDocument } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ like: undefined }>();

	export let liked: boolean | undefined | null | MonumentLikeGraphqlDocument;
	export let imgSrc: string | URL | null | undefined;
</script>

{#if imgSrc}
	<button
		on:dblclick={() => {
			if (!liked) dispatch('like');
		}}
	>
		<Img class="rounded-lg object-cover " src={imgSrc} />
	</button>
{/if}
