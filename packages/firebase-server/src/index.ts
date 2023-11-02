import { initializeApp } from 'firebase-admin/app'
import Notifications from './utils/notification'
import admin from 'firebase-admin'
import firebase from 'firebase-admin'
import json from './firebasePrivateKey.json'

//const { privateKey } = JSON.parse(`{"privateKey":"${process.env.FIREBASE_PRIVATE_KEY}"}`)

console.log(firebase.apps.length)

if (!firebase.apps.length) {
	const firebaseApp = initializeApp({
		//@ts-ignore
		credential: admin.credential.cert(json),
		projectId: process.env.FIREBASE_PROJECT_ID,
	})
}

const notifications = Notifications()

export { notifications }
