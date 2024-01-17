<script lang="ts">
	import appwrite, { user } from '$lib/appwrite/appwrite';
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
	import { Button } from 'flowbite-svelte';
	import { setClientCookieSession } from '$lib/utils/auth';

	export let data: PageData;

	let email = '';
	let password = '';
	let repeatPassword = '';
	let state: 'loading' | 'email-sent' | null = null;
	$: ableToRegister = email.length > 7 && password.length > 6 && repeatPassword.length > 6;

	const createSuccessURL = () => {
		const url = new URL(`${location.origin}/auth/register/verifyemail`);
		if (data.params) {
			url.searchParams.append('myId', data.params.myId);
			url.searchParams.append('username', data.params.username);
		}
		return url;
	};

	const registerViaEmail = async () => {
		try {
			//log out the current user
			await user.deleteSessions();
		} catch (error) {}
		try {
			state = 'loading';

			if (password !== repeatPassword) {
				alert('', $LL.page.signUp.passwordsDontMatch(), { color: 'yellow' });
				throw new Error('password dont equal');
			}

			await user.create(appwrite.ID.unique(), email, password, data.params.username);

			const {
				logInViaEmail: { session }
			} = await sdk.loginViaEmail({ email, password });
			$lsStore.cookieFallback = { a_session_experiences: session };

			await user.createEmailSession(email, password);

			setClientCookieSession(session);

			await user.createVerification(createSuccessURL().href);

			state = 'email-sent';
		} catch (error) {
			if (error instanceof AppwriteException) {
				if (error.code === 409) alert('', $LL.page.signUp.userAlreadyExists(), { color: 'red' });
				else alert('', error.message, { color: 'red' });
			} else alert('', $LL.page.signUp.unsuccessfulRegister(), { color: 'red' });

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
			<Title class="text-xl">{$LL.page.signUp.signUpVia({ via: 'e-mail' })}</Title>
			<EmailInput bind:value={email} />
			<PasswordInput bind:value={password} />
			<PasswordInput bind:value={repeatPassword} />

			<div class="w-full flex justify-center">
				<Button color="blue" disabled={!ableToRegister} on:click={registerViaEmail} class="w-40 ">
					{$LL.page.signUp.signUp()}
				</Button>
			</div>
		</div>
	</div>
{/if}
