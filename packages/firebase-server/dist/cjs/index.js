'use strict';

var app = require('firebase-admin/app');
var messaging = require('firebase-admin/messaging');
var admin = require('firebase-admin');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var messaging__namespace = /*#__PURE__*/_interopNamespaceDefault(messaging);

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

var Notifications = () => {
    const notifications = messaging__namespace.getMessaging();
    const createNotification = ({ title, body, imageUrl, icon, color, clickAction, visibility, redirectionLink, }, tokens) => __awaiter(void 0, void 0, void 0, function* () {
        const notification = {
            title: title,
            body: body,
            imageUrl: imageUrl,
        };
        const message = {
            notification: notification,
            android: {
                notification: Object.assign(Object.assign({}, notification), { icon: icon, color: color, clickAction: clickAction, visibility: visibility }),
                priority: 'high',
            },
            apns: {
                fcmOptions: {
                    imageUrl: imageUrl,
                },
                payload: { aps: { alert: notification } },
            },
            webpush: {
                notification: notification,
                fcmOptions: { link: redirectionLink },
            },
            tokens: tokens,
        };
        return yield notifications.sendEachForMulticast(message);
    });
    return { create: createNotification };
};

var json = {
    type: 'service_account',
    project_id: 'experiences-5dfad',
    private_key_id: 'c439df885370569396149f4ea61a93e6ac8cde54',
    private_key: process.env.FIREBASE_API_KEY,
    client_email: 'firebase-adminsdk-xopyz@experiences-5dfad.iam.gserviceaccount.com',
    client_id: '110119845593257399449',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xopyz%40experiences-5dfad.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
};

if (!admin.apps.length) {
    app.initializeApp({
        //FIXME: remove ts-ignore
        //@ts-ignore
        credential: admin.credential.cert(json),
        projectId: process.env.FIREBASE_PROJECT_ID,
    });
}
const notifications = Notifications();

exports.notifications = notifications;
//# sourceMappingURL=index.js.map
