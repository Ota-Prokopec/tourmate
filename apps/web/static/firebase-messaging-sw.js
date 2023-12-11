importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const cacheName = 'cache';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(['/icon.png']);
		})
	);
});

// self.addEventListener('fetch', (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then((response) => {
// 			return response || fetch(event.request);
// 		})
// 	);
// });

self.addEventListener('push', (event) => {
	event.waitUntil(
		self.registration.showNotification('Push Notification', {
			icon: '/icon.png',
			badge: '/icon.png',
			image: '/icon.png'
		})
	);
});

const firebaseConfig = {
	apiKey: 'AIzaSyBqsxLc9d2EyzazeYQBcCVjUyxwcP6QecM',
	authDomain: 'experiences-5dfad.firebaseapp.com',
	projectId: 'experiences-5dfad',
	storageBucket: 'experiences-5dfad.appspot.com',
	messagingSenderId: '501553004716',
	appId: '1:501553004716:web:c0395217ddcb42d5e21f09',
	measurementId: 'G-BM0VH8CLR6'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
