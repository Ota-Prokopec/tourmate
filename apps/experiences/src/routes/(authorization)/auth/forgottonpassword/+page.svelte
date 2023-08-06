<script lang="ts">
	import { user } from '@app/appwrite-client';
	import EmailSent from '../Components/EmailSent.svelte';
	import { Helper } from 'flowbite-svelte';
	import { AppwriteException } from 'appwrite';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';

	const minlength = 1;
	let email = '';
	let status: 'filling' | 'email-sent' = 'filling';

	let fail = '';
	let loading: boolean = false;

	const confirm = async () => {
		try {
			loading = true;
			await user.createRecovery(email, `${location.origin}/forgottonpassword/resetpassword`);
			status = 'email-sent';
			loading = false;
		} catch (error) {
			loading = false;
			if (!(error instanceof AppwriteException)) return;
			fail = error.message;
			setTimeout(() => (fail = ''), fail.length * 100); //it deletes fail errors messages
		}
	};
</script>

<!---->

{#if status === 'filling'}
	<div class="w-full h-min flex flex-wrap flex-row items-center justify-center p-5 gap-6">
		<div class="text-center">Zapoměli jste heslo, nebo si ho jen chcete změnit?</div>
		<div class="text-center">
			Napište váš e-mail a vyčkejte, než vám přijde kód pro obnovení hesla.
		</div>

		<div class="max-w-[400px] w-full flex items-center gap-4 flex-wrap mt-[40px] flex-col">
			<EmailInput bind:value={email} />
			<Helper color="red">{fail}</Helper>
			<Button
				class="h-10 w-64 bg-blue-500"
				on:click={() => confirm()}
				disabled={email.length < minlength}
			>
				{#if loading}
					<Loading />
				{:else}
					pokračovat
				{/if}
			</Button>
		</div>
	</div>
{:else if status === 'email-sent'}
	<EmailSent />
{/if}
