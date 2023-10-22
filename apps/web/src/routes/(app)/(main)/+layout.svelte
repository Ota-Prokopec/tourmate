<script lang="ts">
	import { browser } from '$app/environment';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';
	import type { Location, MonumentDocument } from '@app/ts-types';
	import { watchUsersLocation } from '@app/utils';
	import { useQuery } from '@sveltestack/svelte-query';
	import { writable } from 'svelte/store';

	let location: Location | undefined;

	$: browser && watchUsersLocation((loc) => (location = loc));

	//$: newMonumentAdded = !browser ? writable([]) : svelteCollections.monument.listenInsert();
</script>

<div class="w-full flex justify-center absolute p-4" />

<slot />
