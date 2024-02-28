<script lang="ts">
	import { navigate } from '$lib/utils/navigator';
	import type { PageData } from '../$types';
	import SetLocationForNotificationsPage from './Components/SetLocationForNotificationsPage.svelte';

	export let data: PageData;

	const saved = () => {
		navigate(-1);
	};
</script>

<SetLocationForNotificationsPage on:back={saved} userId={data.user.userId} />
