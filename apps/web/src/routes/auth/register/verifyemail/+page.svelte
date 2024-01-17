<script lang="ts">
	import { goto } from '$app/navigation';
	import { user, user as userStore } from '$lib/appwrite/appwrite';
	import Center from '$lib/components/Common/Center.svelte';
	import { sdk } from '$src/graphql/sdk.js';
	import { alert } from '$src/routes/alertStore';
	import { Circle3 } from 'svelte-loading-spinners';
	import type { PageData } from './$types';
	import LL from '$src/i18n/i18n-svelte';
	import { getSystemLanguageAbbreviation } from '@app/utils';
	import { isLanguage } from '@app/ts-types';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(async () => {
		try {
			if (!data.params.token.userId || !data.params.token.secret)
				throw new Error('userId or secret token is not defined');

			await userStore.updateVerification(data.params.token.userId, data.params.token.secret);

			let defaultLanguage = getSystemLanguageAbbreviation();
			if (!isLanguage(defaultLanguage)) defaultLanguage = 'en';
			if (!isLanguage(defaultLanguage))
				throw new Error(
					'the language should be en if you have some language that Tourmate does not support the default is en'
				);

			const { createAccount: account } = await sdk.createAccount({
				myId: data.params.myId,
				username: data.params.username,
				language: defaultLanguage
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
