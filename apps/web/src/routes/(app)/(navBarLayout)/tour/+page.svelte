<script lang="ts">
	import ToursSection from '$lib/components/Paginators/ToursPaginator.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ToursSection userId={data.user.userId} />
