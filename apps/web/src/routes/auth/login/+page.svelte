<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_SESSION_NAME } from '$env/static/public';
	import { user } from '$lib/appwrite/appwrite';
	import Button from '$lib/components/Common/Button.svelte';
	import Link from '$lib/components/Common/Link.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import LoginViaSocilaMedia from '../Components/LoginViaSocilaMedia.svelte';

	const expires = new Date(Date.now() + 999999999999 * 1000);

	const expireTimeString = expires.toUTCString();

	let password = '';
	let email = 'otaprokopec@gmail.com';
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
			document.cookie = `${PUBLIC_SESSION_NAME}=${session};path=/;maxAge=99999999999999;expires=${expireTimeString}`; //FIXME: remove this shit by adding a custom domain to your client and server as sub domain
			goto('/');
		} catch (err) {
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
