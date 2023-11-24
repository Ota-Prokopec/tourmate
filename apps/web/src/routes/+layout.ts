import { setLocale } from '$src/i18n/i18n-svelte';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	await loadLocaleAsync('cs');
	setLocale('cs');
};
