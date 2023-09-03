import { router } from '../../trpc';
import { createExperience } from './routes/createExperience';
import { createMonument } from './routers/monuments/routes/createMonument';
import { getExperiencesByLocation } from './routes/getExperiencesByLocation';
import { getExperiencesByUser } from './routes/getExperiencesByUser';
import { getExperiencesByUserByMyId } from './routes/getExperiencesByUserByMyId';
import { monumentsRouter } from './routers/monuments/router';

export const experienceRouter = router({
	create: createExperience,
	getListByLocation: getExperiencesByLocation,
	getListByUser: getExperiencesByUser,
	getListByUserByMyId: getExperiencesByUserByMyId,
	createMonument: createMonument,
	monument: monumentsRouter
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type AppRouter = typeof experienceRouter;
