<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import lsStore, { storage } from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk.js';
	import ErrorHelper from '$lib/components/Common/ErrorHelper.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import { onMount } from 'svelte';

	const { user: usersParams } = $lsStore;

	export let data;
	let errMessage = '';

	onMount(async () => {
		try {
			const { $id: userId } = await user.get();

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

			if (!usersParams) throw new Error('Users params in localstorage are not complete');

			//if your account is not created, create an account
			if (!myUserInfoAlreadyExists) {
				//create experience account
				const { createAccount: account } = await sdk.createAccount({
					myId: usersParams.myId,
					username: usersParams.username
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
