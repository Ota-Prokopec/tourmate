import { writable } from 'svelte/store';
import { LayoutLoad } from '../$types';
import type { Base64 } from '@app/ts-types';

export const load: LayoutLoad = (event) => {
	const pictureStore = writable<string | Base64 | null | undefined>();
	return { pictureStore };
};
