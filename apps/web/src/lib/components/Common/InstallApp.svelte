<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Alert from '../Alert/Alert.svelte';
	import Text from './Text.svelte';
	import Row from './Row.svelte';

	let installPrompt: any = null;

	onMount(async () => {
		window.addEventListener('beforeinstallprompt', (event) => {
			console.log('install');

			installPrompt = event;
		});
	});

	const install = async () => {
		if (!installPrompt) throw new Error('installPrompt is not defined');
		const result = await installPrompt.prompt();
	};
</script>

{#if installPrompt}
	<Alert
		class="h-[100vh] w-[100vw] absolute top-0 left-0 max-w-none max-h-none justify-center flex items-center m-0"
		color="green"
	>
		<Text slot="title" class="text-xl">{$LL.component.InstallApp.title()}</Text>
		<Text slot="message" class="">{$LL.component.InstallApp.text()}</Text>
		<Row class="gap-2" slot="buttons">
			<Button on:click={install} color="green">
				{$LL.component.InstallApp.installButtonLabel()}
			</Button>
			<Button on:click={() => (installPrompt = false)} color="red">
				{$LL.component.InstallApp.useChrome()}
			</Button>
		</Row>
	</Alert>
{/if}
