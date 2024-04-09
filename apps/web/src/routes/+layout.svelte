<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { user } from '$lib/appwrite/appwrite';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import SystemDownAlert from '$lib/components/Alert/SystemDownAlert.svelte';
	import CookiesAlert from '$lib/components/Common/CookiesAlert.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { TSystemHealthStatus } from '@app/ts-types';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { alertStore } from './alertStore';
	import { inject } from '@vercel/analytics';
	import { browser, dev } from '$app/environment';
	import OfflinePage from '$lib/components/Pages/OfflinePage.svelte';

	let systemStatus: TSystemHealthStatus | undefined = undefined;

	const queryClient = new QueryClient();

	//client-side appwrite local-storage session loggin out
	onMount(async () => {
		const account = await user.getUser();
		if (!account && !$page.route.id?.startsWith('/auth/')) {
			goto('/auth/login');
		}
	});

	//ssr - server side call about appwrite and qraphql server status
	sdk
		.getSystemHealthStatus()
		.then((result) => {
			systemStatus = result.getSystemHealthStatus;
		})
		.catch((error) => {
			systemStatus = {
				appwriteService: false,
				graphqlService: false
			};
		});

	if (!dev) inject(); //user's analytics
	let isOffline: boolean = false;
	$: isOffline = browser ? !navigator.onLine : false;
	$: console.log(isOffline);
</script>

{#if systemStatus && (!systemStatus?.appwriteService || !systemStatus.graphqlService) && browser && navigator.onLine}
	<SystemDownAlert />
{/if}

<Alert
	class="z-[9999] absolute top-0 max-w-[500px] w-[95%] m-2"
	on:close={() => ($alertStore.shown = false)}
	visible={$alertStore.shown}
	color={$alertStore.details?.color}
>
	<Text slot="title">{$alertStore.title}</Text>
	<Text slot="message">{$alertStore.message}</Text>
	<span slot="buttons">
		{#if !$alertStore.details?.buttons}
			<Button on:click={() => ($alertStore.shown = false)} color={$alertStore.details?.color}
				>ok</Button
			>
		{:else}
			{#each $alertStore.details.buttons as button}
				<Button color={$alertStore.details?.color} on:click={button.onClick}>{button.title}</Button>
			{/each}
		{/if}
	</span>
</Alert>

<CookiesAlert />

<QueryClientProvider client={queryClient}>
	{#if $navigating}
		<FullPageLoading />
	{:else}
		<div class="w-full h-full bg-white dark:bg-black overflow-auto">
			{#if isOffline}
				<OfflinePage />
			{:else}
				<slot />
			{/if}
		</div>
	{/if}
</QueryClientProvider>
