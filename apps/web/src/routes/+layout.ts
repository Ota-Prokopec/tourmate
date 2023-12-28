import { ServerLoad, error, redirect } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';
import { loadLocaleAsync } from '$src/i18n/i18n-util.async';
import { get } from 'svelte/store';
import { getSystemLanguageAbbreviation } from '@app/utils';
import { setLocale } from '$src/i18n/i18n-svelte';
import lsStore from '$lib/utils/lsStore';
import { browser } from '$app/environment';

export const load: ServerLoad = async (event) => {
	const routeId = event.route.id;
	if (!routeId) throw error(404);

	if (browser) await handleColorTheme();

	try {
		const userRes = await sdkssr(event).getAccount();

		return {
			user: userRes.getAccount
		};
	} catch (error) {
		if (event.url.href?.includes('auth')) {
			return { user: null };
		}

		throw redirect(307, '/auth/login');
	}
};

const handleColorTheme = async () => {
	await loadLocaleAsync('cs');
	await loadLocaleAsync('en');

	const { language } = get(lsStore);
	const deviceLanguage = getSystemLanguageAbbreviation();
	if (language) {
		setLocale(language); //set the users locale language
	} else if (deviceLanguage) {
		if (deviceLanguage === 'en' || deviceLanguage === 'cs') setLocale(deviceLanguage);
	} else setLocale('en'); //set the default language

	// service-worker registration
	const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
		scope: '/'
	});
};
