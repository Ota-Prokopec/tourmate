<script lang="ts">
	import { user } from '@app/appwrite-client';
	import { onMount } from 'svelte';
	import { trpc } from '$lib/trpc';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';

	export let data;

	onMount(async () => {
		if (!$user) return;
		try {
			await user.updatePrefs({ termsAccepted: true });
			await trpc($page).account.create.mutate({ myId: data.quiziId });
			goto('/account/interests');
		} catch (error) {
			throw error;
			goto('/');
		}
	});
</script>

<FullPageLoading />
