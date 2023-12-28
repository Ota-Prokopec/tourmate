<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { alertStore } from './alertStore';
	import { lsStore, storage } from '$lib/utils/lsStore';
	import { getThemeInternalMode } from '@app/utils';
	import { user } from '$lib/appwrite/appwrite';
	import { goto } from '$app/navigation';
	import CookiesAlert from '$lib/components/Common/CookiesAlert.svelte';
	import type { LayoutData } from './$types';
	const userIsLoading = user.isLoading;

	export let data: LayoutData;

	let mounted = false;
	onMount(() => (mounted = true));

	const queryClient = new QueryClient();

	//client-side appwrite local-storage session loggin out
	onMount(async () => {
		const account = await user.getUser();
		if (!account && !$page.route.id?.startsWith('/auth/')) {
			goto('/auth/login');
		}
	});

	//darkmode-whitemode
	onMount(async () => {
		const preferencedTheme = data.user?.prefs.colorTheme;
		const deviceTheme = getThemeInternalMode();

		if (
			(preferencedTheme && preferencedTheme === 'dark') ||
			(!preferencedTheme && deviceTheme === 'dark')
		) {
			document.documentElement.classList.add('dark');
		}
	});
</script>

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
			<slot />
		</div>
	{/if}
</QueryClientProvider>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,500&display=swap');

	:global(*) {
		font-family: 'Poppins', sans-serif;
	}
</style>
