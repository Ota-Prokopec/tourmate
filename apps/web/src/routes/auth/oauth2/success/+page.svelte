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
			if (!usersParams) throw new Error('Users params in localstorage are not complete');

			storage.cookieFallback = { a_session_experiences: data.session };

			const { $id: userId } = await user.get();

			if (!userId) throw new Error('User is not Authed');

			const myUserInfoAlreadyExists =
				(await collections.userInfo.listDocuments([Queries.userInfo.equal('userId', userId)]))
					.total > 0;

			//if your account is not created, create an account
			if (myUserInfoAlreadyExists) {
				//create experience account
				const { createAccount: account } = await sdk.createAccount({
					myId: usersParams.myId,
					username: usersParams.username
				});

				if (!account) throw new Error('It was not successful to create your account');
				goto(`/auth/register/setlocationfornotifications`, { invalidateAll: true }); //finish your registration
			} else goto('/'); //go to the main page
		} catch (error) {
			if (error instanceof Error) errMessage = error.message;
		}
	});
</script>

<ErrorHelper bind:message={errMessage} />
<FullPageLoading />
