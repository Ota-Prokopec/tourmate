import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storage: Record<string | number, any> = !browser
	? {}
	: Object.entries<string>(localStorage)
			.map(([key, value]) => [key, JSON.parse(value)])
			.reduce((res, current) => {
				res[current[0]] = current[1];
				return res;
			}, {} as Record<string, any>);

const store = writable(storage);

store.subscribe((storeValue) => {
	if (!browser) return;

	for (const key of Object.keys(storeValue)) {
		if (browser && storeValue[key] !== localStorage[key])
			localStorage.setItem(key, JSON.stringify(storeValue[key]));
	}
});

export default store;
