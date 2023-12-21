<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import { navigate } from '$lib/utils/navigator';
	import SetLocationForNotificationsPage from '$src/routes/(app)/account/[myId]/settings/setlocationfornotifications/Components/SetLocationForNotificationsPage.svelte';
	import type { PageData } from './$types';
	import { getUsersLocation } from '@app/utils';
	import lsStore from '$lib/utils/lsStore';
	import { browser } from '$app/environment';
	import type { Location } from '@app/ts-types';

	export let data: PageData;
	let mapCenter: Location;

	const saved = () => {
		navigate('/');
	};

	$: if (browser)
		getUsersLocation({ enableHighAccuracy: false }).then((usersLocation) => {
			mapCenter = usersLocation;
		});
</script>

{#if data.user}
	<SetLocationForNotificationsPage center={mapCenter} on:back={saved} userId={data.user.userId} />
{:else}
	<Alert>There was an error while loading your account</Alert>
{/if}
