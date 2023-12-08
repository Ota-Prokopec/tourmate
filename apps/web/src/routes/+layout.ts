import { browser } from '$app/environment';
import { lsStore } from '$lib/utils/lsStore';
import { setLocale } from '$src/i18n/i18n-svelte';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { get } from 'svelte/store';
import { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	await loadLocaleAsync('cs');
	await loadLocaleAsync('en');
	if (browser) {
		const { language } = get(lsStore);
		if (language) {
			setLocale(language);
		}
	}
};
