import type { App } from 'firebase-admin/app'
import * as messaging from 'firebase-admin/messaging'
import { link } from 'fs'

export default () => {
	const notifications = messaging.getMessaging()

	const createNotification = async (
		{
			title,
			body,
			imageUrl,
			icon,
			color,
			clickAction,
			visibility,
			redirectionLink,
		}: {
			title?: string
			body?: string
			imageUrl?: string
			icon?: string
			color?: string
			clickAction?: string
			visibility?: 'private' | 'public' | 'secret'
			redirectionLink?: string
		},
		tokens: string[],
	) => {
		const notification: messaging.Notification = {
			title: title,
			body: body,
			imageUrl: imageUrl,
		}

		const message: messaging.MulticastMessage = {
			notification: notification,
			android: {
				notification: {
					...notification,
					icon: icon,
					color: color,
					clickAction: clickAction,
					visibility: visibility,
				},
				priority: 'high',
			},
			apns: {
				fcmOptions: {
					imageUrl: imageUrl,
				},
				payload: { aps: { alert: notification } },
			},
			webpush: {
				notification: notification,
				fcmOptions: { link: redirectionLink },
			},
			tokens: tokens,
		}
		return await notifications.sendEachForMulticast(message)
	}

	return { create: createNotification }
}
