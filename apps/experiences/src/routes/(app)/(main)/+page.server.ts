import { trpc } from '$lib/trpc';
import appwriteServer from '@app/appwrite-server';

export const load = async (event) => {
	const { locale } = await appwriteServer.setCookie(event.cookies.getAll());
	const location = await locale.getLocation();

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
