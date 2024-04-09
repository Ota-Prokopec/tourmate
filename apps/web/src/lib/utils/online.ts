import { writable } from 'svelte/store';

export const isOnline = writable<'online' | 'offline' | 'ssr'>('ssr');

if (window) isOnline.set(navigator.onLine ? 'online' : 'offline');

window?.addEventListener('online', () => isOnline.set('online'));
window?.addEventListener('offline', () => isOnline.set('offline'));
