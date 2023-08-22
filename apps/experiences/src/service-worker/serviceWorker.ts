import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyBqsxLc9d2EyzazeYQBcCVjUyxwcP6QecM',
	authDomain: 'experiences-5dfad.firebaseapp.com',
	projectId: 'experiences-5dfad',
	storageBucket: 'experiences-5dfad.appspot.com',
	messagingSenderId: '501553004716',
	appId: '1:501553004716:web:c0395217ddcb42d5e21f09',
	measurementId: 'G-BM0VH8CLR6'
};

const firebase = initializeApp(firebaseConfig);

const messaging = getMessaging(firebase);
