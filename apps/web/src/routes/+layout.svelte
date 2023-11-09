<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { string } from 'zod';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import type { Color } from '$lib/components/Alert/Alert';
	import Text from '$lib/components/Common/Text.svelte';
	import { alertStore } from './alertStore';
	import { Button } from 'flowbite-svelte';

	const queryClient = new QueryClient();
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
