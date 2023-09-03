import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Location } from '@app/ts-types';

export type Storage =
	| {
			location?: Location;
			usersBeforeLoginViaSocialMediaData?: { username: string; myId: string };
			cookieFallback?: Record<'a_session_experiences', string>;
	  } & Record<string, any>;

const storage: Storage = !browser
	? {}
	: Object.entries<string>(localStorage)
			.map(([key, value]) => [key, JSON.parse(value)] as [keyof Storage, any])
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

export default store;
export const typedStore = <Type>() => {
	return writable<Type>(storage as Type);
};
