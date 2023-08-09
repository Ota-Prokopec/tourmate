import { router } from '../../trpc';
import { createExperience } from './routes/createExperience';
import { getExperiencesByLocation } from './routes/getExperiencesByLocation';
import { getExperiencesByUser } from './routes/getExperiencesByUser';
import { getExperiencesByUserByMyId } from './routes/getExperiencesByUserByMyId';

export const experienceRouter = router({
	create: createExperience,
	getListByLocation: getExperiencesByLocation,
	getListByUser: getExperiencesByUser,
	getListByUserByMyId: getExperiencesByUserByMyId
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type AppRouter = typeof experienceRouter;
