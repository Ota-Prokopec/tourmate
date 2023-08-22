import { FirebaseOptions, initializeApp } from 'firebase/app'
import Notifications from './utils/notification'

//@ts-ignore
const { VITE_FIREBASE_MESSAGING_VAPID_KEY, VITE_FIREBASE_API_KEY } = {
	VITE_FIREBASE_API_KEY: 'AIzaSyBqsxLc9d2EyzazeYQBcCVjUyxwcP6QecM',
	VITE_FIREBASE_MESSAGING_VAPID_KEY: 'BORZK8G04pvCDA7bsFEKd1WcKsCeqpjHKxqBG9gLZVzDeq8s298FdkEsrFI1xBnptMUojchQrJfFPunlJ8R',
}

const firebaseConfig: FirebaseOptions = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: 'experiences-5dfad.firebaseapp.com',
	projectId: 'experiences-5dfad',
	storageBucket: 'experiences-5dfad.appspot.com',
	messagingSenderId: '501553004716',
	appId: '1:501553004716:web:c0395217ddcb42d5e21f09',
	measurementId: 'G-BM0VH8CLR6',
}

// set service-worker

const firebase = initializeApp(firebaseConfig)

const notifications = Notifications(firebase, VITE_FIREBASE_MESSAGING_VAPID_KEY)

export { notifications }
