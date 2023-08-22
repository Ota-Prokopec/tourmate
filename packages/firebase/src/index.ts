import { FirebaseOptions, initializeApp } from 'firebase/app'
import Notifications from './utils/notification'

const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyBqsxLc9d2EyzazeYQBcCVjUyxwcP6QecM',
	authDomain: 'experiences-5dfad.firebaseapp.com',
	projectId: 'experiences-5dfad',
	storageBucket: 'experiences-5dfad.appspot.com',
	messagingSenderId: '501553004716',
	appId: '1:501553004716:web:c0395217ddcb42d5e21f09',
	measurementId: 'G-BM0VH8CLR6',
}

// set service-worker

const firebase = initializeApp(firebaseConfig)

const notifications = Notifications(firebase)

export { notifications }
