import { initializeApp } from 'firebase-admin/app'
import Notifications from './utils/notification'
import admin from 'firebase-admin'
import firebase from 'firebase-admin'
import json from './firebasePrivateObject'

if (!firebase.apps.length) {
	const firebaseApp = initializeApp({
		credential: admin.credential.cert(json),
		projectId: process.env.FIREBASE_PROJECT_ID,
	})
}

export const notifications = Notifications()
