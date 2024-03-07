<script lang="ts">
	import { user } from '$lib/appwrite/appwrite';
	import EmailSent from '../Components/EmailSent.svelte';
	import { Helper } from 'flowbite-svelte';
	import { AppwriteException } from 'appwrite';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import Column from '$lib/components/Common/Column.svelte';

	const minlength = 1;
	let email = '';
	let status: 'filling' | 'email-sent' = 'filling';

	let loading: boolean = false;

	const confirm = async () => {
		try {
			loading = true;
			await user.createRecovery(email, `${location.origin}/auth/forgottonpassword/resetpassword`);
			status = 'email-sent';
			loading = false;
		} catch (error) {
			loading = false;

			alert('', $LL.page.forgottenPassword.error(), { color: 'red' });
		}
	};
</script>

<!---->

{#if status === 'filling'}
	<Column class="items-center">
		<Text class="text-center">{$LL.page.forgottenPassword.title()}</Text>

		<div class="max-w-[400px] w-full flex items-center gap-4 flex-wrap mt-[40px] flex-col">
			<EmailInput bind:value={email} />
			<Button
				class="h-10 w-64 bg-blue-500"
				on:click={() => confirm()}
				disabled={email.length < minlength}
			>
				{#if loading}
					<Loading />
				{:else}
					{$LL.page.forgottenPassword.continue()}
				{/if}
			</Button>
		</div>
	</Column>
{:else if status === 'email-sent'}
	<EmailSent />
{/if}
