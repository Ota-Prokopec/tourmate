<script lang="ts">
	import * as appwrite from 'appwrite';
	import LoadMoreButton from '$lib/components/Buttons/LoadMoreButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LoadMoreButton />
