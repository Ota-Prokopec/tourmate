<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Common/Button.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import Title from '$lib/components/Common/Title.svelte';
	import IconEnvelope from '$lib/components/Icons/IconEnvelope.svelte';
	import IconEye from '$lib/components/Icons/IconEye.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import { user } from '@app/appwrite-client';
	import lsStore from '$lib/utils/lsStore';

	export let data: PageData;

	import LoginViaSocilaMedia from '../../Components/LoginViaSocilaMedia.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	let email = '';
	let password = '';
	let repeatPassword = '';

	const register = async () => {
		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}
		try {
			status = 'loading';

			const quiziIdTaken = await collections.userInfo.documentExists([
				Query.equal('myId', registerData.myId)
			]);

			if (quiziIdTaken) {
				status = 'filling';
				error = 'User already taken';
				return;
			}

			await user.create(
				ID.unique(),
				registerData.email,
				registerData.password,
				registerData.name
			);

			await ssrAccount.createEmailSession(registerData.email, registerData.password);

			await user.createVerification(
				`${location.origin}/register/verifyemail/${registerData.myId}`
			);

			await user.updatePrefs({ quiziId: registerData.myId });
			status = 'email-sent';
		} catch (err) {
			status = 'filling';
			if (!(err instanceof AppwriteException)) return;
			error = err.message;
		}
	};

	const registerViaEmail = async () => {
		const res = await user.createAccount(email, password, data.params.username);
		//log in
		createAccount();
	};

	const createAccount = () => {
		//create account api
	};

	const beforeLoginViaSocialMedia = () => {
		$lsStore.usersBeforeLoginViaSocialMediaData = {
			...data.params
		};
	};
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center justify-start p-5 mt-4 gap-14">
	<div class="w-full max-w-[400px] flex flex-wrap flex-col gap-4 relative">
		<Title class="text-xl">Zaregistrovat přes e-mail</Title>
		<EmailInput bind:value={email} />
		<PasswordInput bind:value={password} />
		<PasswordInput bind:value={repeatPassword} />
		<div class="w-full flex justify-center">
			<Button class="w-40">Zaregistrovat</Button>
		</div>
	</div>

	<div class="w-full flex flex-wrap flex-col gap-4 relative">
		<Title class="text-xl">Zaregistrovat přes sociální sítě</Title>

		<LoginViaSocilaMedia on:beforeLogin={beforeLoginViaSocialMedia} />
	</div>
</div>
