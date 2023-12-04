declare const notifications: {
    generateToken: (serviceWorkerRegistration: ServiceWorkerRegistration) => Promise<string>;
    initUser: (userId: string, serviceWorkerRegistration: ServiceWorkerRegistration) => Promise<string>;
    watchNotifications: (callback: (payload: import("@firebase/messaging").MessagePayload) => void) => void;
};
export { notifications };
//# sourceMappingURL=index.d.ts.map