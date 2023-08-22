<script lang="ts">
	import { browser } from '$app/environment';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';
	import { svelteCollections, collections } from '@app/appwrite-client';
	import type { Location, MonumentDocument } from '@app/ts-types';
	import { useQueryWithCallback } from '@app/utils';
	import { watchUsersLocation } from '@app/utils/src/utils/location';
	import { useQuery } from '@sveltestack/svelte-query';
	import { writable } from 'svelte/store';

	let location: Location | undefined;

	$: browser && watchUsersLocation((loc) => (location = loc));

	$: newMonumentAdded = browser ? writable([]) : svelteCollections.monument.listenInsert();
</script>

<div class="w-full flex justify-center absolute p-4">
	{#if $newMonumentAdded?.length}
		<MyAlert class="w-full relative" color="green">
			<span slot="title">New monumet was added</span>
			<span>{$newMonumentAdded?.at(-1)?.name}</span>
		</MyAlert>
	{/if}
</div>

<slot />
