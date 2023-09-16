import { sdkssr } from '$src/graphql/sdkssr';
import type { LayoutServerLoad } from './$types';
import appwriteServer from '@app/appwrite-server';

export const load: LayoutServerLoad = async (event) => {
	const { locale } = await appwriteServer.setCookie(event.cookies.getAll());
	const location = await locale.getLocation();

	const monumentExperiencesWithCreators = await sdkssr(
		event
	).getListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments({
		input: {
			location: location,
			zoom: 14
		}
	});

	const { getListOfMonuments: monuments, getListOfExperience: experiences } =
		monumentExperiencesWithCreators;

	return {
		monuments,
		experiences
	};
};
