import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Base64, Location } from '@app/ts-types';
import { Locales } from '$src/i18n/i18n-types';
import * as lodash from 'lodash';

export type Data =
	| {
			usersLocation?: Location;
			user?: { username: string; myId: string };
			cookieFallback?: Record<'a_session_experiences', string>;
			newExperiencePicture?: string | Base64;
			alreadyHasNotificationToken?: boolean;
			'color-theme'?: 'light' | 'dark';
			language?: Locales;
	  } & Record<string, any>;

const parseLocalStorageValue = (value: string) => {
	try {
		return JSON.parse(value);
	} catch (error) {
		return value;
	}
};

const data: Data = !browser
	? {}
	: Object.entries<string>(localStorage)
			.map(([key, value]) => [key, parseLocalStorageValue(value)] as [keyof Storage, any])
			.reduce((res, current) => {
				res[current[0]] = current[1];
				return res;
			}, {} as Storage);

export const lsStore = writable(data);

lsStore.subscribe((storeValue) => {
	if (!browser) return;
	for (const key of Object.keys(storeValue)) {
		if (browser && storeValue[key] !== localStorage[key])
			localStorage.setItem(key, JSON.stringify(storeValue[key]));
	}
});

export default lsStore;
export const typedStore = <Type>() => {
	return writable<Type>(data as Type);
};

export const storage = new Proxy(data, {
	get: (target, prop, receiver) => {
		const item = localStorage.getItem(prop.toString());
		return item ? parseLocalStorageValue(item) : item;
	},
	set: (target, prop, value, receiver) => {
		lsStore.update((currentData) => ({ ...currentData, [prop.toString()]: value }));
		//localStorage.setItem(prop.toString(), JSON.stringify(value));
		return true;
	},
	deleteProperty: (target, propKey) => {
		Reflect.deleteProperty(target, propKey.toString());
		lsStore.update((currentData) => ({ ...lodash.omit(currentData, propKey.toString()) }));
		return false;
	}
});
