<script lang="ts">
	import appwrite, { user } from '$lib/appwrite/appwrite';
	import Button from '$lib/components/Common/Button.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Title from '$lib/components/Common/Title.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { AppwriteException } from 'appwrite';
	import EmailSent from '../../../Components/EmailSent.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let email = 'otaprokopec@gmail.com';
	let password = 'aaaaaaaa';
	let repeatPassword = 'aaaaaaaa';
	let state: 'loading' | 'email-sent' | null = null;
	$: ableToRegister = email.length > 7 && password.length > 6 && repeatPassword.length > 6;

	//set username and myid into localstorage for being able to access this data when user registers via socila media
	$lsStore.user = {
		...data.params
	};

	const registerViaEmail = async () => {
		try {
			state = 'loading';

			if (password !== repeatPassword) {
				alert('', $LL.passwordsDontMatch(), { color: 'yellow' });
				throw new Error('password dont equal');
			}

			try {
				await user.create(appwrite.ID.unique(), email, password, data.params.username);
			} catch (error) {
				if (!(error instanceof AppwriteException)) return;
				if (error.code === 409) alert('', $LL.userAlreadyExists(), { color: 'yellow' });
				throw new Error('appwrite does not allow you to create an account');
			}
			try {
				const {
					logInViaEmail: { session }
				} = await sdk.loginViaEmail({ email, password });
				$lsStore.cookieFallback = { a_session_experiences: session };
			} catch (err) {
				state = null;
				if (err instanceof AppwriteException) alert('apollo', err.message);
				throw new Error('registration failed');
			}

			try {
				await user.createVerification(
					`${location.origin}/auth/register/verifyemail/${data.params.myId}`
				);
			} catch (error) {
				alert('', $LL.unsuccessfulRegister(), { color: 'yellow' });
				throw new Error('appwrite did not successfully created a verification email for you');
			}
			state = 'email-sent';
		} catch (error) {
			state = null;
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
			<Title class="text-xl">{$LL.signUpVia({ via: 'e-mail' })}</Title>
			<EmailInput bind:value={email} />
			<PasswordInput bind:value={password} />
			<PasswordInput bind:value={repeatPassword} />

			<div class="w-full flex justify-center">
				<Button disabled={!ableToRegister} on:click={registerViaEmail} class="w-40 ">
					Zaregistrovat
				</Button>
			</div>
		</div>
	</div>
{/if}