import { sdkssr } from '$src/graphql/sdkssr';
import { PageServerLoad } from '../(main)/$types';

export const load: PageServerLoad = async (event) => {
	const { getListOfExperiences: experiences } = await sdkssr(event).getListOfExperiences();

	experiences.getListOfExperiences;

	return { loadedExperiences: experiences };
};
