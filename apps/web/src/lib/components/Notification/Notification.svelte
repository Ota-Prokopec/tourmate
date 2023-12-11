<script lang="ts">
	import { collections, user } from '$lib/appwrite/appwrite';
	import { lsStore, storage } from '$lib/utils/lsStore';
	import { alert } from '$src/routes/alertStore';
	import { owner } from '@app/appwrite-permissions';
	import type { NotificationBodyPayload, NotificationType } from '@app/ts-types';
	import type { MessagePayload } from 'firebase/messaging';
	import { onMount } from 'svelte';
	import Alert from '../Alert/Alert.svelte';
	import Text from '../Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import Center from '../Common/Center.svelte';
	import FirebaseMonumentNotification from './FirebaseMonumentNotification.svelte';

	type Message = MessagePayload & { data: NotificationBodyPayload<NotificationType> };

	let foregroundNotification: Message | undefined;

	$: console.log(foregroundNotification);

	export let userId: string;

	onMount(async () => {
		const { notifications } = await import('@app/firebase-client');
		notifications.watchNotifications(console.log);

		const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			type: 'classic',
			scope: '/'
		});

		notifications.watchNotifications((payload) => (foregroundNotification = payload as Message));

		if (storage.alreadyHasNotificationToken) return; //user already has a notification token

		const token = await notifications.initUser(userId, reg);

		try {
			await collections.token.createDocument(
				{
					userId: userId,
					fcmFirebaseToken: token
				},
				owner(userId)
			);
		} catch (error) {}

		storage.alreadyHasNotificationToken = true;
	});
</script>

<Center class="w-full h-auto">
	{@const data = foregroundNotification?.data}
	{#if data?.type === 'newMonument'}
		<FirebaseMonumentNotification monumentId={data.monumentId} />
	{/if}
</Center>
