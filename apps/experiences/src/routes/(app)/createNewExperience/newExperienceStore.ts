import type { Base64, Position } from '@app/ts-types';
import { writable } from 'svelte/store';

export const myNewExperienceStore = writable<{
	imageSrc: string | Base64;
	position: Position;
}>();
