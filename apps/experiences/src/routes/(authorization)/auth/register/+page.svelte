<script lang="ts">
	import { ssrAccount, user } from '@app/appwrite-client';
	import LoginViaSocilaMedia from '../Components/LoginViaSocilaMedia.svelte';
	import { AppwriteException, ID } from 'appwrite';
	import EmailSent from '../Components/EmailSent.svelte';
	import { Helper } from 'flowbite-svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconEnvelope from '$lib/components/Icons/IconEnvelope.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconEye from '$lib/components/Icons/IconEye.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { collections } from '@app/appwrite-client';
	import Link from '$lib/components/Common/Link.svelte';
	import TermsAndConditions from '$lib/components/Common/TermsAndConditions.svelte';
	import { Query } from '@app/appwrite-client';

	let repeatPassword = 'aaaaaaaa';

	let error = '';
	let status: 'email-sent' | 'filling' | 'loading' = 'filling';
	const registerData = {
		email: 'otaprokopec@gmail.com',
		password: 'aaaaaaaa',
		myId: 'otaprokopec',
		name: 'Ota Prokopec'
	};
	let termsAccepted = true;

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
</script>

{#if status === 'filling' || status === 'loading'}
	<div class="w-full h-max flex flex-wrap flex-col items-center justify-start p-5 gap-6">
		<div class="flex w-full max-w-[400px] pl-2 pr-2 flex-wrap flex-col gap-1 h-max">
			<Helper color="red" class="mt-2 relative left-5">{error}</Helper>
			<Input
				icon
				class="w-full !rounded-3xl"
				bind:value={registerData.email}
				placeholder="Zadejte email"
			>
				<IconEnvelope />
			</Input>

			<Input
				icon
				class="w-full !rounded-3xl"
				bind:value={registerData.name}
				placeholder="Zadejte uživatelské jméno"
			>
				<Icon icon="fa fa-user" />
			</Input>

			<Input
				maxLength={40}
				class="w-full h-[60px]"
				bind:value={registerData.myId}
				icon="@"
				prefix="@"
				placeholder="Zadejte ID jméno"
			/>

			<Input
				let:active
				iconFunction="password"
				icon
				class="w-full !rounded-3xl"
				bind:value={registerData.password}
				placeholder="Zadejte heslo"
			>
				<IconEye {active} />
			</Input>
			<Input
				let:active
				iconFunction="password"
				icon
				class="w-full !rounded-3xl"
				bind:value={repeatPassword}
				placeholder="Opakujte heslo"
			>
				<IconEye {active} />
			</Input>

			{#if registerData.password !== repeatPassword}
				<Helper class="mt-2 relative left-5" color="red">Hesla nejsou stejná!</Helper>
			{/if}
		</div>

		<TermsAndConditions bind:accepted={termsAccepted} />

		<Button
			reactiveToEnterKey={true}
			class="h-10 w-64 bg-blue-500 text-white"
			on:click={() => register()}
			disabled={!(
				registerData.email.length >= 8 &&
				registerData.name.length >= 4 &&
				registerData.myId.length >= 4 &&
				registerData.password.length >= 8 &&
				registerData.password === repeatPassword &&
				termsAccepted
			)}
			>{#if status === 'loading'}
				<Loading />
			{:else}
				Zaregistrovat se
			{/if}</Button
		>
		<LoginViaSocilaMedia />

		<Link href="/auth/login">přihlásit se</Link>
	</div>
{:else}
	<EmailSent />
{/if}
