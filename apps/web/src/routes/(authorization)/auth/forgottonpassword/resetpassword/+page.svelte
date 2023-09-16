<script lang="ts">
	import { user } from '@app/appwrite-client';
	import { Helper } from 'flowbite-svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { AppwriteException } from 'appwrite';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';
	import { Button as FlowbiteButton } from 'flowbite-svelte';

	export let data;

	let newPassword = '';
	let repeatPassword = '';
	let error = '';
	let loading: boolean = false;
	let success = false;

	const resetPassword = async () => {
		try {
			await user.updateRecovery(
				data.resetPasswordTokens.userId,
				data.resetPasswordTokens.secret,
				newPassword,
				repeatPassword
			);
			success = true;
		} catch (err) {
			if (!(err instanceof AppwriteException)) return;
			error = err.message;
			setTimeout(() => (error = ''), error.length * 100); //it deletes fail errors messages
		}
	};
</script>

<MyAlert color="green" visible={true}>
	<span slot="title">Password was successfully changed</span>
	<span slot="buttons">
		<FlowbiteButton color="green" on:click={() => goto('/login')}>zpět</FlowbiteButton>
	</span>
</MyAlert>

<div class="w-full h-min flex flex-wrap flex-col items-center justify-center p-5 gap-6">
	<div class="w-full text-center">Obnovte si vaše heslo</div>
	<div class="flex w-full pl-2 pr-2 flex-wrap flex-row gap-1 justify-center">
		<PasswordInput
			class="w-full max-w-[400px]"
			bind:value={newPassword}
			placeholder="Zadejte nové heslo"
		/>
		<PasswordInput
			class="w-full max-w-[400px]"
			bind:value={repeatPassword}
			placeholder="Zopakujte heslo"
		/>
		<Helper color="red">{error}</Helper>
	</div>

	<Button
		class="h-10 w-64 bg-blue-500"
		on:click={() => resetPassword()}
		disabled={!(newPassword === repeatPassword && newPassword.length >= 8)}
	>
		{#if loading}
			<Loading />
		{:else}
			pokračovat
		{/if}
	</Button>
</div>
