import { browser } from '$app/environment';
import { lsStore } from '$lib/utils/lsStore';
import { setLocale } from '$src/i18n/i18n-svelte';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { get } from 'svelte/store';
import { LayoutLoad } from './$types';
import { getSystemLanguageAbbreviation } from '@app/utils';

export const load: LayoutLoad = async (event) => {
	await loadLocaleAsync('cs');
	await loadLocaleAsync('en');
	if (browser) {
		const { language } = get(lsStore);
		const deviceLanguage = getSystemLanguageAbbreviation();
		if (language) {
			setLocale(language); //set the users locale language
		} else if (deviceLanguage) {
			if (deviceLanguage === 'en' || deviceLanguage === 'cs') setLocale(deviceLanguage);
		} else setLocale('en'); //set the default language
	}

	// service-worker registration
	if (browser) {
		const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			scope: '/'
		});
	}
};
