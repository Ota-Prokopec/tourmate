<script lang="ts">
	import type { MessagePayload } from 'firebase/messaging/sw';
	import MyAlert from '../Alert/Alert.svelte';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';

	export let message: MessagePayload | undefined;
</script>

{#if message?.notification}
	<MyAlert class="m-4 min-w-[400px]" color="green">
		<svelte:fragment slot="title">
			{message.notification.title}
		</svelte:fragment>
		<svelte:fragment slot="message">
			{message.notification.body}
		</svelte:fragment>
		<svelte:fragment slot="buttons">
			{#if message?.fcmOptions?.link}
				<Button
					on:click={() => {
						if (!message?.fcmOptions?.link) throw new Error('no link here');
						goto(message.fcmOptions.link);
					}}>přejít</Button
				>
			{/if}
		</svelte:fragment>
	</MyAlert>
{/if}
