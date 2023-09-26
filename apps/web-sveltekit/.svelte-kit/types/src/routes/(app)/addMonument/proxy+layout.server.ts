// @ts-nocheck
import { sdkssr } from '$src/graphql/sdkssr';
import type { LayoutServerLoad } from './$types';
import appwriteServer from '@app/appwrite-server';

export const load = async (event: Parameters<LayoutServerLoad>[0]) => {
	const { locale } = await appwriteServer.setCookie(event.cookies.getAll());
	const location = await locale.getLocation();

	const monumentExperiencesWithCreators = await sdkssr(
		event
	).getListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments({
		input: {
			location: location,
			zoom: 14
		}
	});

	const { getListOfMonuments: monuments, getListOfExperiences: experiences } =
		monumentExperiencesWithCreators;

	return {
		monuments,
		experiences
	};
};
