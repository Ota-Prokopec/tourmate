<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '@app/appwrite-client';
	import { onMount } from 'svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';

	export let data;
	onMount(async () => {
		if (!data.userId || !data.secret) return;
		try {
			await user.updateVerification(data.userId, data.secret);
			goto(`/register/createAccount/${data.myId}`);
		} catch (err) {
			throw err;

			//goto('/register/failed');
		}
	});
</script>

<FullPageLoading />
