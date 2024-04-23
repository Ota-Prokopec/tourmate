<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/appwrite/appwrite';
	import ButtonCreateAnonymousSession from '$lib/components/Buttons/ButtonCreateAnonymousSession.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Link from '$lib/components/Common/Link.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import WhatAppOffersButton from '$lib/components/Common/WhatAppOffersButton.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import { setClientCookieSession } from '$lib/utils/auth';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { isLanguage } from '@app/ts-types';
	import { getSystemLanguageAbbreviation } from '@app/utils';
	import LoginViaSocilaMedia from '../Components/LoginViaSocilaMedia.svelte';
	import Card from '$lib/components/Common/Card.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import IconAppwrite from '$lib/components/Icons/IconAppwrite.svelte';
	import Row from '$lib/components/Common/Row.svelte';

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
			$lsStore.cookieFallback = { a_session_experiences: session };
			await setClientCookieSession(session);

			goto('/', { invalidateAll: true });
		} catch (err) {
			alert('', $LL.page.signIn.unsuccessfulLogin(), { color: 'yellow' });
			loading = false;
		}
	};

	const createAnonymousSession = async () => {
		loading = true;

		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}

		try {
			const { session } = (await sdk.createAnonymousSession()).createAnonymousSession;
			$lsStore.cookieFallback = { a_session_experiences: session };
			await setClientCookieSession(session);

			const appwriteAccount = await user.get();

			//if your account is not created, create an account
			//set up the language
			let language = getSystemLanguageAbbreviation();
			if (!isLanguage(language)) language = 'en'; //set the default language
			if (!isLanguage(language))
				throw new Error(
					'the language should be en if you have some language that Tourmate does not support the default is en'
				);

			//create experience account
			const { createAccount: account } = await sdk.createAccount({
				myId: appwriteAccount.$id,
				username: 'Anonymous',
				language: language
			});

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
	<ButtonCreateAnonymousSession on:click={createAnonymousSession} />
	<WhatAppOffersButton class="mt-4" />

	<Card href="https://appwrite.io">
		<Row class="gap-2">
			<Text>Powered by Appwrite</Text>
			<Icon class="child:w-6 child:h-6">
				<IconAppwrite />
			</Icon>
		</Row>
	</Card>
</Column>
