import { initializeApp } from 'firebase-admin/app'
import Notifications from './utils/notification'
import admin from 'firebase-admin'
import firebase from 'firebase-admin'
import json from './firebasePrivateObject'

if (!firebase.apps.length) {
	const firebaseApp = initializeApp({
		//FIXME: remove ts-ignore
		//@ts-ignore
		credential: admin.credential.cert(json),
		projectId: process.env.FIREBASE_PROJECT_ID,
	})
}

const notifications = Notifications()

export { notifications }
