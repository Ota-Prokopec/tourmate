// @ts-nocheck
import { sdkssr } from '$src/graphql/sdkssr';
import { PageServerLoad } from './$types';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
	const expId = event.params.experienceId;
	const res = await sdkssr(event).getExperienceWithCreatorAndHisOtherExperiences({ id: expId });
	return {
		experience: res.getExperience
	};
};
