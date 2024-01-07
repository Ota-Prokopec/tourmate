<script lang="ts">
	import { browser } from '$app/environment';
	import MyAlert from '$lib/components/Alert/Alert.svelte';
	import type { Location, MonumentDocument } from '@app/ts-types';
	import { watchUsersLocation } from '@app/utils';
	import { useQuery } from '@sveltestack/svelte-query';
	import { writable } from 'svelte/store';

	//$: newMonumentAdded = !browser ? writable([]) : svelteCollections.monument.listenInsert();
</script>

<slot />
