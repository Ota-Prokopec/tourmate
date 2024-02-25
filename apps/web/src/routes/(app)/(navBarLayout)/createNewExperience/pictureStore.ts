import { Base64 } from '@app/ts-types';
import { writable } from 'svelte/store';

export const pictureStore = writable<string | Base64 | null | undefined>();
