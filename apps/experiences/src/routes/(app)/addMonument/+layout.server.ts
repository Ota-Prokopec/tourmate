import { trpc } from '$lib/trpc';
import type { LayoutServerLoad } from './$types';
import appwriteServer from '@app/appwrite-server';

export const load: LayoutServerLoad = async (event) => {
	const { locale } = await appwriteServer.setCookie(event.cookies.getAll());
	const location = await locale.getLocation();

	return {
		monuments: await trpc(event).experience.monument.getListByLocation.query({
			location: location,
			zoom: 14
		})
	};
};
