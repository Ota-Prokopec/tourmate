import { FirebaseApp } from 'firebase/app';
import * as messaging from 'firebase/messaging';
declare const _default: (firebase: FirebaseApp, vapidKey: string) => {
    generateToken: (serviceWorkerRegistration: ServiceWorkerRegistration) => Promise<string>;
    initUser: (userId: string, serviceWorkerRegistration: ServiceWorkerRegistration) => Promise<string>;
    watchNotifications: (callback: (payload: messaging.MessagePayload) => void) => void;
};
export default _default;
//# sourceMappingURL=notification.d.ts.map