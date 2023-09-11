import { FirebaseApp } from 'firebase/app'
import * as messaging from 'firebase/messaging'
import { collections } from '@app/appwrite-client'
import * as permissions from '@app/appwrite-permissions'

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
		try {
			await collections.token.createDocument(
				{
					userId,
					fcmFirebaseToken: token,
				},
				permissions.owner(userId),
			)
		} catch (error) {}
	}

	return { generateToken, initUser, watchNotifications }
}
