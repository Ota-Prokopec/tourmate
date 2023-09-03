<script lang="ts">
	import '../app.css';
	import { navigating, page } from '$app/stores';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { browser } from '$app/environment';
	import { trpc } from '$lib/trpc';
	import { Posts } from '../graphql/generated-svelte';
	import { getSdk } from '$src/graphql/generated';
	import { GraphQLClient } from 'graphql-request';
	import { useQuery } from '@apollo/client';
	const queryClient = new QueryClient();
	const client = new GraphQLClient('');

	const sdk = getSdk(client);

	sdk.Posts({
		email: ''
	}).then(res => res.posts.forEach(post => post.author))

	useQuery("", ())

	//$: if (!$user && !$isLoading) goto('login'); //this is client-side Auth controll

	//auto localization
	//	$: browser && start();

	$: postsQuery = Posts({
		variables: {
			email: 'asfd@gmail.com'
		}
	});
	$: posts = $postsQuery.loading || $postsQuery.error ? null : $postsQuery.data.posts;
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
