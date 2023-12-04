import { initializeApp } from 'firebase/app';
import * as messaging from 'firebase/messaging';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Notifications = (firebase, vapidKey) => {
    const notifications = messaging.getMessaging(firebase);
    const generateToken = (serviceWorkerRegistration) => __awaiter(void 0, void 0, void 0, function* () {
        const permissions = yield Notification.requestPermission();
        if (permissions !== 'granted')
            throw new Error('permissions denied');
        return yield messaging.getToken(notifications, {
            vapidKey: vapidKey,
            serviceWorkerRegistration: serviceWorkerRegistration,
        });
    });
    const watchNotifications = (callback) => {
        messaging.onMessage(notifications, callback);
    };
    const initUser = (userId, serviceWorkerRegistration) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield generateToken(serviceWorkerRegistration);
        return token;
    });
    return { generateToken, initUser, watchNotifications };
};

//@ts-ignore
const { VITE_FIREBASE_MESSAGING_VAPID_KEY, VITE_FIREBASE_API_KEY } = {
    VITE_FIREBASE_API_KEY: 'AIzaSyBqsxLc9d2EyzazeYQBcCVjUyxwcP6QecM',
    VITE_FIREBASE_MESSAGING_VAPID_KEY: 'BORZK8G04pvCDA7bsFEKd1WcKsCeqpjHKxqBG9gLZVzDeq8s298FdkEsrFI1xBnptMUojchQrJfFPunlJ8R-zDc',
};
const firebaseConfig = {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: 'experiences-5dfad.firebaseapp.com',
    projectId: 'experiences-5dfad',
    storageBucket: 'experiences-5dfad.appspot.com',
    messagingSenderId: '501553004716',
    appId: '1:501553004716:web:c0395217ddcb42d5e21f09',
    measurementId: 'G-BM0VH8CLR6',
};
// set service-worker
const firebase = initializeApp(firebaseConfig);
const notifications = Notifications(firebase, VITE_FIREBASE_MESSAGING_VAPID_KEY);

export { notifications };
//# sourceMappingURL=index.js.map
