importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
	apiKey: 'AIzaSyBqsxLc9d2EyzazeYQBcCVjUyxwcP6QecM',
	authDomain: 'experiences-5dfad.firebaseapp.com',
	projectId: 'experiences-5dfad',
	storageBucket: 'experiences-5dfad.appspot.com',
	messagingSenderId: '501553004716',
	appId: '1:501553004716:web:c0395217ddcb42d5e21f09',
	measurementId: 'G-BM0VH8CLR6'
};

// set service-worker

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
