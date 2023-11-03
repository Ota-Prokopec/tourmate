import { sdkssr } from '$src/graphql/sdkssr';
import type { LayoutServerLoad } from './$types';
import appwriteServer from '@app/appwrite-server';

export const load: LayoutServerLoad = async (event) => {
	const { locale } = await appwriteServer.setCookie(event.cookies.getAll());
	const location = await locale.getLocation();

	const monumentExperiencesWithCreators = await sdkssr(event).getListOfItemsForMap({
		location: {
			location: location,
			range: 14
		}
	});

	const { getListOfMonuments: monuments, getListOfExperiences: experiences } =
		monumentExperiencesWithCreators;

	return {
		monuments,
		experiences
	};
};
