import type { App } from 'firebase-admin/app'
import * as messaging from 'firebase-admin/messaging'

export default () => {
	const notifications = messaging.getMessaging()

	const createNotification = async ({ title, body }: { title: string; body: string }, tokens: string[]) => {
		const message: messaging.MulticastMessage = {
			notification: { title, body },
			tokens: tokens,
		}
		return await notifications.sendEachForMulticast(message)
	}

	return { create: createNotification }
}
