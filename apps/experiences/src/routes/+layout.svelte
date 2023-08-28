<script lang="ts">
	import '../app.css';
	import { navigating, page } from '$app/stores';
	import { user, isLoading } from '@app/appwrite-client';
	import { goto } from '$app/navigation';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { browser } from '$app/environment';
	//import { start } from '../service-worker/serviceWorker';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { trpc } from '$lib/trpc';

	export let data: LayoutData;

	console.log(user.client);

	const queryClient = new QueryClient();

	//$: if (!$user && !$isLoading) goto('login'); //this is client-side Auth controll

	//auto localization
	//	$: browser && start();
</script>

<QueryClientProvider client={queryClient}>
	{#if $navigating}
		<FullPageLoading />
	{:else}
		<slot />
	{/if}
</QueryClientProvider>
