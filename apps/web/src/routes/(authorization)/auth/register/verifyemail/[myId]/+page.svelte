<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/appwrite/appwrite.js';
	import { onMount } from 'svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { sdk } from '$src/graphql/sdk.js';
	import ErrorHelper from '$lib/components/Common/ErrorHelper.svelte';

	export let data;
	let errorMessage = '';

	onMount(async () => {
		if (!data.params.userId || !data.params.secret)
			throw new Error('userId or secret token is not defined');
		console.log(data.user);

		if (!$user) throw new Error('user is not defiened, maybe try it again');

		try {
			await user.updateVerification(data.params.userId, data.params.secret);

			const { createAccount: account } = await sdk.createAccount({
				myId: data.params.myId,
				username: $user.name
			});

			if (!account) {
				throw new Error('It was not successful to create your account');
			}
			goto('/');
		} catch (error) {
			if (error instanceof Error) errorMessage = error.message;
		}
	});
</script>

<ErrorHelper bind:message={errorMessage} />
<FullPageLoading />
