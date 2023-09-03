<script lang="ts">
	import LoginViaSocilaMedia from '../Components/LoginViaSocilaMedia.svelte';
	import { ssrAccount, user } from '@app/appwrite-client';
	import { Alert, Helper } from 'flowbite-svelte';
	import { AppwriteException } from 'appwrite';
	import IconEnvelope from '$lib/components/Icons/IconEnvelope.svelte';
	import IconEye from '$lib/components/Icons/IconEye.svelte';
	import { goto } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Link from '$lib/components/Common/Link.svelte';
	import { browser } from '$app/environment';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { sdk } from '$src/graphql/sdk';
	import lsStore from '$lib/utils/lsStore';

	let password = 'aaaaaaaa';
	let email = 'otaprokopec@gmail.com';
	let error = '';
	let loading = false;

	$: condition = email.length >= 1 && password.length >= 1;

	const login = async () => {
		//loading = true;

		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}

		try {
			const res = await sdk.LoginViaEmail({ email, password });
			$lsStore.cookieFallback = { a_session_experiences: res.logInViaEmail.session };
			goto('/');
		} catch (err) {
			console.log(err);

			loading = false;
			error = 'email or password are wrong';
			setTimeout(() => (error = ''), error.length * 100); //it deletes fail errors messages
		}
	};
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-5 gap-6">
	<div class="flex w-full pl-2 pr-2 flex-wrap flex-col gap-1 max-w-[400px]">
		<Input icon class="w-full !rounded-3xl" bind:value={email} placeholder="Zadejte email">
			<IconEnvelope />
		</Input>
		<Input
			let:active
			iconFunction="password"
			icon
			class="w-full !rounded-3xl"
			bind:value={password}
			placeholder="Zadejte heslo"
		>
			<IconEye {active} />
		</Input>

		{#if error}
			<Helper color="red">{error}</Helper>
		{/if}
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
	<Link href="/auth/forgottonpassword">Zapoměl(a) jste heslo?</Link>
	<Link href="/auth/register">registrovat se</Link>
</div>
