<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Avatar, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Alert from '../Alert/Alert.svelte';
	import Text from './Text.svelte';
	import Row from './Row.svelte';
	import Center from './Center.svelte';
	import Column from './Column.svelte';

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
	<Center class="justify-center items-center bg-black h-[100vh] w-[100vw] absolute z-[99]">
		<Column class="gap-10 h-full justify-start items-center">
			<Avatar
				rounded
				border
				class="w-32 h-32 justify-self-center rounded-full mt-10 mb-2"
				src="/icon.png"
			/>
			<Alert
				class="relative max-w-none max-h-none justify-center flex items-center m-0"
				color="green"
			>
				<Avatar
					rounded
					border
					class="w-10 h-10 justify-self-center rounded-full mt-10 mb-2"
					src="/icon.png"
				/>
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
		</Column>
	</Center>
{/if}
