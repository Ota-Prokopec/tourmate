import { router } from '../../trpc';
import { getProfileByMyId } from './routes/getProfileByMyId';
import { getProfile } from './routes/getProfile';

export const profileRouter = router({
	getProfile: getProfile,
	getProfileByMyId: getProfileByMyId
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type UserRouter = typeof profileRouter;
