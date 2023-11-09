<script lang="ts">
	import Title from '$lib/components/Common/Title.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import appwrite, { user } from '$lib/appwrite/appwrite';
	import lsStore from '$lib/utils/lsStore';
	import LoginViaSocilaMedia from '../../Components/LoginViaSocilaMedia.svelte';
	import type { PageData } from './$types';
	import { sdk } from '$src/graphql/sdk';
	import ErrorHelpler from '$lib/components/Common/ErrorHelper.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import { Checkbox, Toggle } from 'flowbite-svelte';
	import { ApolloError } from '@apollo/client';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Loading from '$lib/components/Common/Loading.svelte';
	import EmailSent from '../../Components/EmailSent.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { AppwriteException } from 'appwrite';

	export let data: PageData;

	let email = 'otaprokopec@gmail.com';
	let password = 'aaaaaaaa';
	let repeatPassword = 'aaaaaaaa';
	let state: 'loading' | 'email-sent' | null = null;
	let error = '';
	let termsAccepted = false;
	$: ableToRegister =
		termsAccepted && email.length > 7 && password.length > 6 && repeatPassword.length > 6;

	//set username and myid into localstorage for being able to access this data when user registers via socila media
	$lsStore.user = {
		...data.params
	};

	const registerViaEmail = async () => {
		try {
			state = 'loading';

			await user.create(appwrite.ID.unique(), email, password, data.params.username);

			const {
				logInViaEmail: { session }
			} = await sdk.loginViaEmail({ email, password });
			$lsStore.cookieFallback = { a_session_experiences: session };

			await user.createVerification(
				`${location.origin}/auth/register/verifyemail/${data.params.myId}`
			);

			state = 'email-sent';
		} catch (err) {
			state = null;
			if (err instanceof AppwriteException) error = err.message;
			if (!(err instanceof ApolloError)) return;
			error = err.message;
		}
	};
</script>

{#if state === 'email-sent'}
	<EmailSent />
{:else if state === 'loading'}
	<FullPageLoading />
{:else}
	<div class="w-full h-auto flex flex-wrap flex-col items-center justify-start p-5 mt-4 gap-14">
		<div class="w-full max-w-[400px] flex flex-wrap flex-col gap-4 relative">
			<Title class="text-xl">Zaregistrovat přes e-mail</Title>
			<EmailInput bind:value={email} />
			<PasswordInput bind:value={password} />
			<PasswordInput bind:value={repeatPassword} />
			<ErrorHelpler bind:message={error} timeout={2000} />

			<div class="w-full flex justify-center">
				<Button disabled={!ableToRegister} on:click={registerViaEmail} class="w-40 ">
					Zaregistrovat
				</Button>
			</div>
		</div>

		<Checkbox bind:checked={termsAccepted}>accept terms and permissions</Checkbox>

		<div class="w-full flex flex-wrap flex-col gap-4 relative">
			<Title class="text-xl">Zaregistrovat přes sociální sítě</Title>

			<LoginViaSocilaMedia disabled={!termsAccepted} on:click={() => (state = 'loading')} />
		</div>
	</div>
{/if}
