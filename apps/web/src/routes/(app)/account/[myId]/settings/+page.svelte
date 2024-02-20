<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/appwrite/appwrite';
	import Center from '$lib/components/Common/Center.svelte';
	import DarkMode from '$lib/components/Common/DarkMode.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import ItemsLayout from '$lib/components/Common/ItemsLayout.svelte';
	import LanguageSwitch from '$lib/components/Common/LanguageSwitch.svelte';
	import { lsStore } from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { ColorTheme } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import LogOutButton from './Components/LogOutButton.svelte';

	let isLoading = false;
	export let data: PageData;

	let colorTheme: ColorTheme = data.user.prefs.colorTheme;

	const logOut = async () => {
		isLoading = true;
		try {
			await user.deleteSessions();
			await sdk.logout();
			$lsStore.cookieFallback = { a_session_experiences: '' };
			goto('/auth/login');
		} catch (error) {
			alert('', $LL.page.account.settings.logOut.errorMessage(), { color: 'red' });
		}
		isLoading = false;
	};

	let items: [
		{ id: 'language'; title: string },
		{ id: 'theme'; title: string },
		{ id: 'locationForNotifications'; title: string },
		{ id: 'logOut'; title: string }
	];
	$: items = [
		{ title: $LL.page.account.settings.language(), id: 'language' },
		{ title: $LL.page.account.settings.theme(), id: 'theme' },
		{
			title: $LL.page.account.settings.locationForNotifications.title(),
			id: 'locationForNotifications'
		},
		{ title: $LL.page.account.settings.logOut.label(), id: 'logOut' }
	];
</script>

{#if isLoading}
	<FullPageLoading />
{:else}
	<Center class="h-full w-full">
		<ItemsLayout class="justify-center items-center" textClasses="w-full" let:id {items}>
			{#if id === 'language'}
				<LanguageSwitch class="w-min" />
			{:else if id === 'theme'}
				<DarkMode bind:theme={colorTheme} class="w-min" />
			{:else if id === 'locationForNotifications'}
				<Button
					color="blue"
					on:click={() => goto(`/account/${data.user.myId}/settings/setlocationfornotifications`)}
					>{$LL.page.account.settings.locationForNotifications.buttonLabel()}</Button
				>
			{:else if id === 'logOut'}
				<LogOutButton on:click={logOut} />
			{/if}
		</ItemsLayout>
	</Center>
{/if}
