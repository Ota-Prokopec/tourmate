<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LogOutButton from './Components/LogOutButton.svelte';
	import { lsStore } from '$lib/utils/lsStore';
	import { alert } from '$src/routes/alertStore';
	import LL from '$src/i18n/i18n-svelte';
	import { user } from '$lib/appwrite/appwrite';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import DarkMode from '$lib/components/Common/DarkMode.svelte';
	import LanguageSwitch from '$lib/components/Common/LanguageSwitch.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import Center from '$lib/components/Common/Center.svelte';

	let isLoading = false;

	const logOut = async () => {
		isLoading = true;
		try {
			await sdk.logout();
			await user.deleteSessions();
			$lsStore.cookieFallback = { a_session_experiences: '' };
			goto('/auth/login');
		} catch (error) {
			alert('', $LL.logOutError(), { color: 'red' });
		}
		isLoading = false;
	};

	let items: [
		{ id: 'language'; title: string },
		{ id: 'theme'; title: string },
		{ id: 'logOut'; title: string }
	];
	$: items = [
		{ title: $LL.language(), id: 'language' },
		{ title: $LL.theme(), id: 'theme' },
		{ title: $LL.logOut(), id: 'logOut' }
	];
</script>

{#if isLoading}
	<FullPageLoading />
{:else}
	<Center class="h-full w-full">
		<ItemsLayout class="justify-center items-center" textClasses="w-full" let:id {items}>
			{#if id === 'language'}
				<LanguageSwitch class="w-min" />
			{/if}
			{#if id === 'theme'}
				<DarkMode class="w-min" />
			{/if}
			{#if id === 'logOut'}
				<LogOutButton on:click={logOut} />
			{/if}
		</ItemsLayout>
	</Center>
{/if}
