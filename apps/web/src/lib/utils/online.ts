import { writable } from 'svelte/store';

export const isOnline = writable<'online' | 'offline' | 'ssr'>('ssr');

if (typeof window !== 'undefined') isOnline.set(navigator.onLine ? 'online' : 'offline');

if (typeof window !== 'undefined') window?.addEventListener('online', () => isOnline.set('online'));
if (typeof window !== 'undefined')
	window?.addEventListener('offline', () => isOnline.set('offline'));
