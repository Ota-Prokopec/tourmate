<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SESSION_NAME } from '$env/static/public';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import ErrorHelper from '$lib/components/Common/ErrorHelper.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { storage } from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk.js';
	import { isLanguage } from '@app/ts-types';
	import { getSystemLanguageAbbreviation } from '@app/utils';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { alert } from '$src/routes/alertStore';
	import LL from '$src/i18n/i18n-svelte';

	export let data: PageData;

	let { username, myId } = data;

	let errMessage = '';

	const expires = new Date(Date.now() + 999999999999 * 1000);

	const expireTimeString = expires.toUTCString();

	onMount(async () => {
		try {
			//session in localstorage for client to appwrite
			storage.cookieFallback = { a_session_experiences: data.session };
			//cookies for ssr
			document.cookie = `${PUBLIC_SESSION_NAME}=${data.session};path=/;maxAge=99999999999999;expires=${expireTimeString}`; //FIXME: remove this shit by adding a custom domain to your client and server as sub domain

			const { $id: userId, ...userData } = await user.get();

			if (!userId) throw new Error('User is not Authed');

			const myUserInfoAlreadyExists =
				(await collections.userInfo.listDocuments([Queries.userInfo.equal('userId', userId)]))
					.total > 0;

			//if there already is a userInfo document with my $id it means i only want to login so navigate me into the main page
			if (myUserInfoAlreadyExists) {
				goto('/', { invalidateAll: true }); //go to the main page
				return;
			}

			//*if the user does not have myId and username in query in url (it happens when user clicks google login before creating user account)
			if (!myId) myId = `@${userId}`;
			if (!username) username = userData.name;

			//if your account is not created, create an account
			//set up the language
			let language = getSystemLanguageAbbreviation();
			if (!isLanguage(language)) language = 'en'; //set the default language
			if (!isLanguage(language))
				throw new Error(
					'the language should be en if you have some language that Tourmate does not support the default is en'
				);

			if (!myUserInfoAlreadyExists) {
				//create experience account
				const { createAccount: account } = await sdk.createAccount({
					myId: myId,
					username: username,
					language: language
				});

				if (!account) throw new Error('It was not successful to create your account');
				goto(`/auth/register/setlocationfornotifications`, { invalidateAll: true }); //finish your registration
			}
		} catch (error) {
			alert('', $LL.page.oauth.success.errorMessage(), { color: 'red' });
		}
	});
</script>

<FullPageLoading />
