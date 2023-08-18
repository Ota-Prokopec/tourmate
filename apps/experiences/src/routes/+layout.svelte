<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import { user, isLoading } from '@app/appwrite-client';
	import { goto } from '$app/navigation';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { getUsersLocation } from '@app/utils';

	const queryClient = new QueryClient();

	//$: if (!$user && !$isLoading) goto('login'); //this is client-side Auth controll

	//set-save user's location for server-side use
	async () => {
		//const location = await getUsersLocation();
	};
</script>

<QueryClientProvider client={queryClient}>
	{#if $navigating}
		<FullPageLoading />
	{:else}
		<slot />
	{/if}
</QueryClientProvider>
