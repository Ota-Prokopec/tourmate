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
</script>

{#if isLoading}
	<FullPageLoading />
{:else}
	<Column class="w-full justify-center items-center h-full">
		<LogOutButton on:click={logOut} />
	</Column>
{/if}
