import { ServerLoad, error, redirect } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { get } from 'svelte/store';
import { getSystemLanguageAbbreviation } from '@app/utils';
import { setLocale } from '$src/i18n/i18n-svelte';
import lsStore from '$lib/utils/lsStore';
import { browser } from '$app/environment';
import { Language } from '@app/ts-types';

export const load: ServerLoad = async (event) => {
	const routeId = event.route.id;
	if (!routeId) throw error(404);

	// service-worker registration
	if (browser) {
		const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			scope: '/'
		});
	}

	try {
		const user = (await sdkssr(event).getAccount()).getAccount;

		await handleColorTheme(user.prefs.language); //if the user exists it means that he has the language in appwrite

		return {
			user
		};
	} catch (error) {
		await handleColorTheme(); //the default or system language

		if (event.url.href?.includes('auth')) {
			return { user: null };
		}

		throw redirect(307, '/auth/login');
	}
};

const handleColorTheme = async (myLanguage?: Language) => {
	await loadLocaleAsync('cs');
	await loadLocaleAsync('en');

	const deviceLanguage = getSystemLanguageAbbreviation();
	if (myLanguage) {
		setLocale(myLanguage); //set the users locale language
	} else if (deviceLanguage) {
		if (deviceLanguage === 'en' || deviceLanguage === 'cs') setLocale(deviceLanguage);
	} else setLocale('en'); //set the default language
};
