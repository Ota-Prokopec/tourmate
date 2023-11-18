<script lang="ts">
	import LoginViaSocilaMedia from '../Components/LoginViaSocilaMedia.svelte';
	import { user } from '$lib/appwrite/appwrite';
	import IconEnvelope from '$lib/components/Icons/IconEnvelope.svelte';
	import IconEye from '$lib/components/Icons/IconEye.svelte';
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Common/Input.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Link from '$lib/components/Common/Link.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { sdk } from '$src/graphql/sdk';
	import lsStore from '$lib/utils/lsStore';
	import ErrorHelper from '$lib/components/Common/ErrorHelper.svelte';
	import { parseApolloError } from '@app/utils';
	import { alert } from '$src/routes/alertStore';
	import LL from '$src/i18n/i18n-svelte';
	import { ApolloError } from '@apollo/client';
	import { ApolloErrorMessageHandler } from '@apollo/client/utilities/globals/invariantWrappers';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';

	let password = 'aaaaaaaa';
	let email = 'otaprokopec@gmail.com';
	let loading = false;

	$: condition = email.length >= 1 && password.length >= 1;

	const login = async () => {
		loading = true;

		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}

		try {
			const res = await sdk.loginViaEmail({ email, password });
			$lsStore.cookieFallback = { a_session_experiences: res.logInViaEmail.session };
			goto('/');
		} catch (err) {
			console.log(err);

			const apolloError = parseApolloError(err);

			alert('', $LL.unsuccessfulLogin(), { color: 'yellow' });
			loading = false;
		}
	};
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-5 gap-6">
	<div class="flex w-full pl-2 pr-2 flex-wrap flex-col gap-1 max-w-[400px]">
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
			Přihlásit se
		{/if}
	</Button>
	<LoginViaSocilaMedia />
	<Link href="/auth/forgottonpassword">{$LL.forgotenPassword()}</Link>
	<Link href="/auth/register">{$LL.signUp()}</Link>
</div>
