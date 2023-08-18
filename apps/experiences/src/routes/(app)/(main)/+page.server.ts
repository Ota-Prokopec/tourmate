import { trpc } from '$lib/trpc';
import appwriteServer from '@app/appwrite-server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { locale } = await appwriteServer.setCookie(event.cookies.getAll());
	const location = await locale.getLocation();

	console.log({ location });

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
