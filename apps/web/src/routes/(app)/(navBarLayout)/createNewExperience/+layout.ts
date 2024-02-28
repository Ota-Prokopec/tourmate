import { writable } from 'svelte/store';
import type { Base64 } from '@app/ts-types';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = (event) => {
	const pictureStore = writable<string | Base64 | null | undefined>();
	return { pictureStore };
};
