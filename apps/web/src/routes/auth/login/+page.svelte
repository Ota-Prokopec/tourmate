<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SESSION_NAME } from '$env/static/public';
	import { user } from '$lib/appwrite/appwrite';
	import Button from '$lib/components/Common/Button.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Link from '$lib/components/Common/Link.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import WhatAppOffersButton from '$lib/components/Common/WhatAppOffersButton.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import { setClientCookieSession } from '$lib/utils/auth';
	import lsStore, { storage } from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import LoginViaSocilaMedia from '../Components/LoginViaSocilaMedia.svelte';

	let password = '';
	let email = '';
	let loading = false;

	$: condition = email.length >= 1 && password.length >= 1;

	const login = async () => {
		loading = true;

		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}

		try {
			const { session } = (await sdk.loginViaEmail({ email, password })).logInViaEmail;
			storage.cookieFallback = { a_session_experiences: session };
			setClientCookieSession(session);

			goto('/', { invalidateAll: true });
		} catch (err) {
			alert('', $LL.page.signIn.unsuccessfulLogin(), { color: 'yellow' });
			loading = false;
		}
	};
</script>

<Column class="items-center gap-6">
	<div class="flex w-full flex-wrap flex-col gap-1 max-w-[400px]">
		<EmailInput class="w-full !rounded-3xl" bind:value={email} />
		<PasswordInput class="w-full !rounded-3xl" bind:value={password} />
	</div>

	<Button
		reactiveToEnterKey
		class="h-10 w-64 bg-blue-500 text-white"
		on:click={() => login()}
		disabled={!condition}
	>
		{#if loading}
			<Loading />
		{:else}
			{$LL.page.signIn.singIn()}
		{/if}
	</Button>
	<LoginViaSocilaMedia />
	<Link href="/auth/forgottenpassword">{$LL.page.signIn.forgottenPassword()}</Link>
	<Link href="/auth/register">{$LL.page.signIn.signUp()}</Link>
	<WhatAppOffersButton class="mt-4" />
</Column>
