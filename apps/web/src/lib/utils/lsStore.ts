import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Base64, Location } from '@app/ts-types';

export type Storage =
	| {
			usersLocation?: Location;
			user?: { username: string; myId: string };
			cookieFallback?: Record<'a_session_experiences', string>;
			newExperiencePicture?: string | Base64;
			'color-theme'?: 'light' | 'dark';
	  } & Record<string, any>;

const parseLocalStorageValue = (value: string) => {
	try {
		return JSON.parse(value);
	} catch (error) {
		return value;
	}
};

console.log(parseLocalStorageValue('ahohj'));

const storage: Storage = !browser
	? {}
	: Object.entries<string>(localStorage)
			.map(([key, value]) => [key, parseLocalStorageValue(value)] as [keyof Storage, any])
			.reduce((res, current) => {
				res[current[0]] = current[1];
				return res;
			}, {} as Storage);

const store = writable(storage);

store.subscribe((storeValue) => {
	if (!browser) return;

	for (const key of Object.keys(storeValue)) {
		if (browser && storeValue[key] !== localStorage[key])
			localStorage.setItem(key, JSON.stringify(storeValue[key]));
	}
});

export const lsStore = store;

export default store;
export const typedStore = <Type>() => {
	return writable<Type>(storage as Type);
};
