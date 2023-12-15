<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk.js';
	import ErrorHelper from '$lib/components/Common/ErrorHelper.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import { onMount } from 'svelte';

	const { user: userParams } = $lsStore;

	export let data;
	let errMessage = '';

	onMount(async () => {
		try {
			$lsStore.cookieFallback = { a_session_experiences: data.session };

			const { $id: userId } = await user.get();

			if (!userId) throw new Error('User is not Authed');

			const myUserInfoAlreadyExists = (
				await collections.userInfo.listDocuments([Queries.userInfo.equal('userId', userId)])
			).total;

			//if your account is not created, create an account
			if (myUserInfoAlreadyExists === 0) {
				//create experience account
				if (!userParams) throw new Error('Users params in localstorage are not complete');
				const { createAccount: account } = await sdk.createAccount({
					myId: userParams.myId,
					username: userParams.username
				});
				if (!account) throw new Error('It was not successful to create your account');
			}

			goto('/auth/setLocationForNotification');
		} catch (error) {
			if (error instanceof Error) errMessage = error.message;
		}
	});
</script>

<ErrorHelper bind:message={errMessage} />
<FullPageLoading />
