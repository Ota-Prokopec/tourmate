import { browser } from '$app/environment';
import { setLocale } from '$src/i18n/i18n-svelte';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { getSystemLanguageAbbreviation, getThemeInternalMode } from '@app/utils';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async (event) => {
	if (!browser) return; // !use this only on browser (client side)

	const routeId = event.route.id;
	if (!routeId) throw error(404);

	//language
	await loadLocaleAsync('cs');
	await loadLocaleAsync('en');

	const myLanguage = event.data.user?.prefs.language;
	const deviceLanguage = getSystemLanguageAbbreviation();

	if (myLanguage) {
		setLocale(myLanguage); //set the users locale language
	} else if (deviceLanguage) {
		if (deviceLanguage === 'en' || deviceLanguage === 'cs') setLocale(deviceLanguage);
	} else setLocale('en'); //set the default language

	// theme dark mode-light mode
	const preferencedTheme = event.data.user?.prefs.colorTheme;
	const deviceTheme = getThemeInternalMode();

	if (
		(preferencedTheme && preferencedTheme === 'dark') ||
		(!preferencedTheme && deviceTheme === 'dark')
	) {
		document.documentElement.classList.add('dark');
	}

	return event.data;
};
