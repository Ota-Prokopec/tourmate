import { page } from '$app/stores';
import { get } from 'svelte/store';
import { Category } from './types';

export const getUrlForSearchPage = (category: Category): URL => {
	const url = new URL(`${get(page).url.origin}/search`);
	url.searchParams.append('chosenCategory', category);
	return url;
};
