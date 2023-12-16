import { initializeApp } from 'firebase-admin/app'
import Notifications from './utils/notification'
import admin from 'firebase-admin'
import firebase from 'firebase-admin'

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, '\n') ?? ''

if (!firebase.apps.length) {
	const firebaseApp = initializeApp({
		credential: admin.credential.cert({
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: privateKey,
			projectId: process.env.FIREBASE_PROJECT_ID,
		}),
		projectId: process.env.FIREBASE_PROJECT_ID,
	})
}

export const notifications = Notifications()
