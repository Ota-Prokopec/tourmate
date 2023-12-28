import { browser } from '$app/environment';
import { setLocale } from '$src/i18n/i18n-svelte';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { getSystemLanguageAbbreviation } from '@app/utils';
import { error } from '@sveltejs/kit';
import { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const routeId = event.route.id;
	if (!routeId) throw error(404);

	// service-worker registration
	if (browser) {
		const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			scope: '/'
		});
	}

	await loadLocaleAsync('cs');
	await loadLocaleAsync('en');

	const myLanguage = event.data.user?.prefs.language;
	const deviceLanguage = getSystemLanguageAbbreviation();

	if (myLanguage) {
		setLocale(myLanguage); //set the users locale language
	} else if (deviceLanguage) {
		if (deviceLanguage === 'en' || deviceLanguage === 'cs') setLocale(deviceLanguage);
	} else setLocale('en'); //set the default language

	return event.data;
};
