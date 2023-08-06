<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { ssrAccount, user } from '@app/appwrite-client';

	export let data;

	$: (async () => {
		if (!browser || !$user) return;
		ssrAccount.setSessionIntoLocalStorage(data.session);
		if (!data.user?.myId) goto(`/auth/register/createAccount/${$user.$id}`);
		// * when user does not exist => create it
		else goto('/');
	})();
</script>

<FullPageLoading />
