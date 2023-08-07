import type { Base64, Location } from '@app/ts-types';
import { writable } from 'svelte/store';

export const myNewExperienceStore = writable<{
	imgSrc: string | Base64;
	location: Location;
}>({ imgSrc: '', location: [0, 0] });
