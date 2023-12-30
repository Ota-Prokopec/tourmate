<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import lsStore, { storage } from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk.js';
	import ErrorHelper from '$lib/components/Common/ErrorHelper.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import { onMount } from 'svelte';
	import { getSystemLanguageAbbreviation } from '@app/utils';
	import { isLanguage } from '@app/ts-types';

	let { user: usersParams } = $lsStore;

	export let data;
	let errMessage = '';

	onMount(async () => {
		try {
			const { $id: userId, ...userData } = await user.get();

			if (!userId) throw new Error('User is not Authed');

			const myUserInfoAlreadyExists =
				(await collections.userInfo.listDocuments([Queries.userInfo.equal('userId', userId)]))
					.total > 0;

			storage.cookieFallback = { a_session_experiences: data.session };

			//if there already is a userInfo document with my $id it means i only want to login so navigate me into the main page
			if (myUserInfoAlreadyExists) {
				goto('/', { invalidateAll: true }); //go to the main page
				return;
			}

			//*if the user does not have user-params in the localstorage (it happens when user clicks google login before creating user account)
			if (!usersParams) {
				//*set the default user-params
				usersParams = {
					myId: `@${userId}`,
					username: userData.name
				};
			}

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
					myId: usersParams.myId,
					username: usersParams.username,
					language: language
				});

				if (!account) throw new Error('It was not successful to create your account');
				goto(`/auth/register/setlocationfornotifications`, { invalidateAll: true }); //finish your registration
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error) errMessage = error.message;
		}
	});
</script>

<ErrorHelper bind:message={errMessage} />
<FullPageLoading />
