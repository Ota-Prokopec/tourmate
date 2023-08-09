import type { Base64, Experience, ExperienceDocument, Location } from '@app/ts-types';
import { writable } from 'svelte/store';

export const myNewExperienceStore = writable<{
	imgSrc: string | Base64;
	location: Location;
	rightNowAddedExperience?: ExperienceDocument | undefined;
}>({
	imgSrc: '',
	location: [0, 0]
});
