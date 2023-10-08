import type { PageServerLoad } from './$types';
import { Preferences } from '@app/ts-types';
import { sdkssr } from '$src/graphql/sdkssr';
import { sdk } from '$src/graphql/sdk';

export const load: PageServerLoad = async (event) => {
	const res = await sdkssr(
		event
	).getListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments({
		input: {
			location: [0, 0], //! change this
			zoom: 14
		}
	});

	const experiences = res.getListOfExperiences;
	const monuments = res.getListOfMonuments;

	return { loadedExperiences: experiences, loadedMonuments: monuments };
};
