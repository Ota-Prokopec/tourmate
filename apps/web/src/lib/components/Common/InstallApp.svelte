<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';
	import Alert from '../Alert/Alert.svelte';
	import Text from './Text.svelte';
	import { browser } from '$app/environment';

	let installPrompt: any = null;

	if (browser) {
		window.addEventListener('beforeinstallprompt', (event) => {
			console.log('install');

			installPrompt = event;
		});
	}
	const install = async () => {
		if (!installPrompt) throw new Error('installPrompt is not defined');
		const result = await installPrompt.prompt();
	};
</script>

<Alert class="fixed bottom-0 m-4 mb-10" color="green">
	<Text slot="title" class="text-xl">{$LL.component.InstallApp.title()}</Text>
	<Text slot="message" class="">{$LL.component.InstallApp.text()}</Text>
	<Button on:click={install} slot="buttons" color="green">
		{$LL.component.InstallApp.installButtonLabel()}
	</Button>
</Alert>
