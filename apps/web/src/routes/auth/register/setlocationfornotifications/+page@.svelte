<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import { navigate } from '$lib/utils/navigator';
	import SetLocationForNotificationsPage from '$src/routes/(app)/account/[myId]/settings/setlocationfornotifications/Components/SetLocationForNotificationsPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const saved = () => {
		navigate('/');
	};
</script>

{#if data.user}
	<SetLocationForNotificationsPage on:back={saved} userId={data.user.userId} />
{:else}
	<Alert>There was an error while loading your account</Alert>
{/if}
