<script lang="ts">
	import { goto } from '$app/navigation';
	import { user as userStore } from '$lib/appwrite/appwrite';
	import Center from '$lib/components/Common/Center.svelte';
	import { sdk } from '$src/graphql/sdk.js';
	import { alert } from '$src/routes/alertStore';
	import { Circle3 } from 'svelte-loading-spinners';
	import type { PageData } from './$types';
	import LL from '$src/i18n/i18n-svelte';

	export let data: PageData;
	let firstTime = true;

	userStore.subscribe(async (user) => {
		if (!user) return;
		if (!firstTime) return;
		else firstTime = false;

		if (!data.params.userId || !data.params.secret)
			throw new Error('userId or secret token is not defined');

		try {
			await userStore.updateVerification(data.params.userId, data.params.secret);

			const { createAccount: account } = await sdk.createAccount({
				myId: data.params.myId,
				username: user.name
			});

			if (!account) {
				throw new Error('It was not successful to create your account');
			}
			goto(`/auth/register/setlocationfornotifications`, { invalidateAll: true }); //finish your registration
		} catch (error) {
			if (error instanceof Error)
				alert('Error', $LL.error.unexpectedError(), {
					color: 'red'
				});
		}
	});
</script>

<Center class="w-full mt-24">
	<Circle3 />
</Center>
