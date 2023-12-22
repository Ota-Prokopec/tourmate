<script lang="ts">
	import { user } from '$lib/appwrite/appwrite';
	import Button from '$lib/components/Common/Button.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import { navigate } from '$lib/utils/navigator.js';
	import LL from '$src/i18n/i18n-svelte.js';
	import { alert } from '$src/routes/alertStore.js';
	import { AppwriteException } from 'appwrite';
	import { Helper } from 'flowbite-svelte';

	export let data;

	let newPassword = '';
	let repeatPassword = '';
	let error = '';
	let isLoading = false;
	$: disable = !(repeatPassword.length >= 8 && newPassword.length >= 8);

	const resetPassword = async () => {
		isLoading = true;
		try {
			await user.updateRecovery(
				data.resetPasswordTokens.userId,
				data.resetPasswordTokens.secret,
				newPassword,
				repeatPassword
			);
			alert('', $LL.passwordChanged(), {
				color: 'green',
				buttons: [{ title: $LL.back(), onClick: () => navigate(-2) }]
			});
		} catch (err) {
			if (!(err instanceof AppwriteException)) return;

			alert('', $LL.passwordChangeError(), { color: 'red' });
		}
		isLoading = false;
	};
</script>

<div class="w-full h-min flex flex-wrap flex-col items-center justify-center p-5 gap-6">
	<div class="w-full text-center">Obnovte si vaše heslo</div>
	<div class="flex w-full pl-2 pr-2 flex-wrap flex-row gap-1 justify-center">
		<PasswordInput class="w-full max-w-[400px]" bind:value={newPassword} />
		<PasswordInput class="w-full max-w-[400px]" bind:value={repeatPassword} />
		<Helper color="red">{error}</Helper>
	</div>

	<Button class="h-10 w-64 bg-blue-500" on:click={() => resetPassword()} disabled={disable}>
		{#if isLoading}
			<Loading />
		{:else}
			pokračovat
		{/if}
	</Button>
</div>
