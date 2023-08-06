<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import { user, isLoading } from '@app/appwrite-client';
	import { goto } from '$app/navigation';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';

	const queryClient = new QueryClient();

	//$: if (!$user && !$isLoading) goto('login'); //this is client-side Auth controll
</script>

<QueryClientProvider client={queryClient}>
	{#if $navigating}
		<FullPageLoading />
	{:else}
		<slot />
	{/if}
</QueryClientProvider>
