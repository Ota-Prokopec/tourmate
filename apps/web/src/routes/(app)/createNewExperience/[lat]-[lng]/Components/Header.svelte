<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import type { Location } from '@app/ts-types';
	export let placeName: string;
	export let location: Location;
</script>

<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
	{placeName}
</h5>
<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
	lokace: [{location}]
</p>
