<script lang="ts">
	import { collections } from '$lib/appwrite/appwrite';
	import { storage } from '$lib/utils/lsStore';
	import { owner } from '@app/appwrite-permissions';
	import type { NotificationBodyPayload, NotificationType } from '@app/ts-types';
	import type { MessagePayload } from 'firebase/messaging';
	import { onMount } from 'svelte';
	import Center from '../Common/Center.svelte';
	import FirebaseMonumentNotification from './FirebaseMonumentNotification.svelte';

	type Message = MessagePayload & { data: NotificationBodyPayload<NotificationType> };

	let foregroundNotification: Message | undefined;

	export let userId: string;

	// onMount(async () => {
	// 	const { notifications } = await import('@app/firebase-client');

	// 	const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
	// 		type: 'classic',
	// 		scope: '/'
	// 	});

	// 	notifications.watchNotifications((payload) => (foregroundNotification = payload as Message));

	// 	if (storage.alreadyHasNotificationToken) return; //user already has a notification token

	// 	const token = await notifications.initUser(userId, reg);

	// 	await collections.token.createDocument(
	// 		{
	// 			userId: userId,
	// 			fcmFirebaseToken: token
	// 		},
	// 		owner(userId)
	// 	);
	// 	storage.alreadyHasNotificationToken = true;
	// });
</script>

<Center class="w-full h-auto z-50">
	{@const data = foregroundNotification?.data}
	{#if data?.type === 'newMonument'}
		<FirebaseMonumentNotification monumentId={data.monumentId} />
	{/if}
</Center>
