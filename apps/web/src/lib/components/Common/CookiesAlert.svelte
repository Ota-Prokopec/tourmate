<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';
	import Alert from '../Alert/Alert.svelte';
	import Text from './Text.svelte';
	import lsStore, { storage } from '$lib/utils/lsStore';
	import Right from './Right.svelte';
	import { browser } from '$app/environment';

	const accepted = () => {
		storage.cookiesAccepted = true;
	};
</script>

{#if browser && !storage.cookiesAccepted}
	<Alert class="absolute bottom-0 m-2 mb-10">
		<Text>
			{$LL.component.CookiesAlert.title()}
		</Text>
		<Right slot="buttons">
			<Button color="green" on:click={accepted}
				>{$LL.component.CookiesAlert.acceptButtonLabel()}</Button
			>
		</Right>
	</Alert>
{/if}
