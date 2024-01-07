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

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const title = 'Experiences';
	const options = {
		body: 'new monument',
		icon: '/icon.png',
		silent: false,
		vibrate: [300, 400, 100],
		data: {
			imageUrl: payload.data.img // Replace with the path to your image
		},
		imageUrl: payload.data.img
	};

	const notification = self.registration.showNotification(title, options);

	addEventListener('notificationclick', (event) => {
		event.notification.close();
		event.waitUntil(
			clients
				.matchAll({
					type: 'window'
				})
				.then((clientList) => {
					for (const client of clientList) {
						if (client.url === '/' && 'focus' in client) return client.focus();
					}
					if (clients.openWindow) return clients.openWindow(`monument/${payload.data.monumentId}`);
				})
		);
	});
});
