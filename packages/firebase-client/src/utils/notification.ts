import { FirebaseApp } from 'firebase/app'
import * as messaging from 'firebase/messaging'
import { collections, permissions } from '@app/appwrite-client'

export default (firebase: FirebaseApp, vapidKey: string) => {
	const notifications = messaging.getMessaging(firebase)

	const generateToken = async (serviceWorkerRegistration: ServiceWorkerRegistration) => {
		const permissions = await Notification.requestPermission()
		if (permissions !== 'granted') throw new Error('permissions denied')
		return await messaging.getToken(notifications, {
			vapidKey: vapidKey,
			serviceWorkerRegistration: serviceWorkerRegistration,
		})
	}

	const watchNotifications = (callback: (payload: messaging.MessagePayload) => void) => {
		messaging.onMessage(notifications, callback)
	}

	const initUser = async (userId: string, serviceWorkerRegistration: ServiceWorkerRegistration) => {
		const token = await generateToken(serviceWorkerRegistration)
		await collections.token.createDocument(
			{
				userId,
				fcmFirebaseToken: token,
			},
			permissions.owner(userId),
		)
	}

	return { generateToken, initUser, watchNotifications }
}
