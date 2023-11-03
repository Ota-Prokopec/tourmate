import type { Color } from '$lib/components/Alert/Alert';
import { writable } from 'svelte/store';

export type AlertOpitions = {
	shown: boolean;
	message: string;
	title: string;
	details?: {
		color: Color;
	};
};

export const alertStore = writable<AlertOpitions>({
	shown: false,
	message: '',
	title: ''
});

export const alert = (title: string, message: string, options?: { color: Color }) => {
	alertStore.set({
		shown: true,
		title,
		message,
		details: options
	});
};
