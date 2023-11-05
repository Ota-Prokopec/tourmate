import { sdkssr } from '$src/graphql/sdkssr';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const expId = event.params.experienceId;
	const res = await sdkssr(event).getExperienceCardAndUsersExperiences({ id: expId });
	return {
		experience: res.getExperience
	};
};
