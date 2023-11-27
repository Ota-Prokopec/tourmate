<script lang="ts">
	import LoadMoreButton from '$lib/components/Buttons/LoadMoreButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LoadMoreButton />
