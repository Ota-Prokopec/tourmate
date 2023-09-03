import { trpc } from '$lib/trpc';
import appwriteServer from '@app/appwrite-server';
import type { PageServerLoad } from './$types';
import { Preferences } from '@app/ts-types';

export const load: PageServerLoad = async (event) => {
	const { account, locale } = await appwriteServer.setCookie(event.cookies.getAll());

	const location =
		(await account.getPrefs<Preferences>()).location ?? (await locale.getLocation());

	const experiences = await trpc(event).experience.getListByLocation.query({
		location: location,
		zoom: 14
	});
	const monuments = await trpc(event).experience.monument.getListByLocation.query({
		location: location,
		zoom: 14
	});
	return { loadedExperiences: experiences, loadedMonuments: monuments };
};
