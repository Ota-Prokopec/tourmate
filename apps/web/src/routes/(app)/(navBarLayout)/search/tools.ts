import { page } from '$app/stores';
import { get } from 'svelte/store';
import { TSearchCategory } from './types';

export const getUrlForSearchPage = (category: TSearchCategory, searchingText?: string): URL => {
	const url = new URL(`${get(page).url.origin}/search`);
	url.searchParams.append('chosenCategory', category);
	if (searchingText) url.searchParams.append('searchingText', searchingText);
	return url;
};
