<script lang="ts">
	import '../app.css';
	import { navigating, page } from '$app/stores';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { browser } from '$app/environment';
	import { trpc } from '$lib/trpc';
	import { useQuery } from '@apollo/client';
	import { LoginViaEmail } from '$src/graphql/generated-svelte';
	import { sdk } from '$src/graphql/sdk';
	import { onMount } from 'svelte';
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

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,500&display=swap');

	:global(*) {
		font-family: 'Poppins', sans-serif;
	}
</style>
