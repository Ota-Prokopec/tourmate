import { NotificationBodyPayload } from '@app/ts-types'
import * as messaging from 'firebase-admin/messaging'
import type { NotificationType } from '@app/ts-types'

export default () => {
	const notifications = messaging.getMessaging()

	const createNotification = async <Type extends NotificationType>(
		{
			title,
			body,
			imageUrl,
			icon,
			color,
			data,
			clickAction,
			visibility,
			redirectionLink,
		}: {
			title?: string
			body?: string
			data?: NotificationBodyPayload<Type>
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
		console.log(data)

		const message: messaging.MulticastMessage = {
			notification: notification,
			/*
			
			*/
			webpush: {
				data: data as unknown as { [key: string]: string }, //FIXME: THIS is really bad way to do it
				notification: notification,
				fcmOptions: { link: redirectionLink },
			},
			android: {
				data: data as unknown as { [key: string]: string }, //FIXME: THIS is really bad way to do it
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
			tokens: tokens,
		}
		return await notifications.sendEachForMulticast(message)
	}

	return { create: createNotification }
}
